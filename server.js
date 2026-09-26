require('dotenv').config();
const path = require('path');
const express = require('express');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || 'ViralMoniPoint <onboarding@resend.dev>';
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, package: pkg, message } = req.body || {};

  if (!name || !email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid name and email are required.' });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
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
    res.json({ ok: true });
  } catch (err) {
    console.error('Resend send failed:', err);
    res.status(502).json({ error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`ViralMoniPoint running at http://localhost:${PORT}`);
});
