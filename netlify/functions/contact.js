const { escapeHtml, emailConfigured, sendToOwner } = require('../lib/email');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
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

  if (!name || !email || !EMAIL_RE.test(email)) {
    return json(400, { error: 'A valid name and email are required.' });
  }

  if (!emailConfigured()) {
    console.error('RESEND_API_KEY or CONTACT_TO_EMAIL is not set.');
    return json(500, { error: 'Email is not configured yet. Please try again later.' });
  }

  try {
    await sendToOwner({
      replyTo: email,
      subject: `New lead: ${name}${pkg ? ` — ${pkg}` : ''}`,
      html: `
        <h2>New ViralMoniPoint lead</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Package:</strong> ${escapeHtml(pkg || 'Not sure yet')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || '').replace(/\n/g, '<br>')}</p>
      `,
    });
    return json(200, { ok: true });
  } catch (err) {
    console.error('Resend send failed:', err);
    return json(502, { error: 'Failed to send email.' });
  }
};
