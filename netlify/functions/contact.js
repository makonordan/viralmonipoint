const { escapeHtml, emailConfigured, sendToOwner } = require('../lib/email');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

// Referral and partner codes: letters and digits only, upper-cased.
function cleanCode(code) {
  return String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid request.' });
  }

  const { name, email, phone, package: pkg, message } = data;
  const referral = cleanCode(data.referral);
  const isPartner = data.type === 'partner';
  const partnerCode = isPartner ? cleanCode(data.partnerCode) : '';

  if (!name || !email || !EMAIL_RE.test(email)) {
    return json(400, { error: 'A valid name and email are required.' });
  }
  if (isPartner && !partnerCode) {
    return json(400, { error: 'Missing partner code.' });
  }

  if (!emailConfigured()) {
    console.error('RESEND_API_KEY or CONTACT_TO_EMAIL is not set.');
    return json(500, { error: 'Email is not configured yet. Please try again later.' });
  }

  const subject = isPartner
    ? `New partner sign-up: ${name} (${partnerCode})`
    : `New lead: ${name}${pkg ? ` — ${pkg}` : ''}${referral ? ` [Ref: ${referral}]` : ''}`;

  const html = isPartner
    ? `
        <h2>New ViralMoniPoint partner sign-up</h2>
        <p><strong>Partner code:</strong> ${escapeHtml(partnerCode)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>WhatsApp:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Details:</strong></p>
        <p>${escapeHtml(message || '').replace(/\n/g, '<br>')}</p>
        <p style="color:#5c5c63">Add this code to your partner sheet so referrals can be matched to it.</p>
      `
    : `
        <h2>New ViralMoniPoint lead</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Package:</strong> ${escapeHtml(pkg || 'Not sure yet')}</p>
        <p><strong>Referral code:</strong> ${escapeHtml(referral || 'None')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || '').replace(/\n/g, '<br>')}</p>
      `;

  try {
    await sendToOwner({ replyTo: email, subject, html });
    return json(200, { ok: true });
  } catch (err) {
    console.error('Resend send failed:', err);
    return json(502, { error: 'Failed to send email.' });
  }
};
