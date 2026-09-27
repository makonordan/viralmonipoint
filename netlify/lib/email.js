const { Resend } = require('resend');

const FROM_EMAIL = process.env.FROM_EMAIL || 'ViralMoniPoint <onboarding@resend.dev>';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

// Sends an email to the site owner. Throws if Resend rejects it.
async function sendToOwner({ subject, html, replyTo }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
    reply_to: replyTo || undefined,
    subject,
    html,
  });
  if (error) throw error;
}

module.exports = { escapeHtml, emailConfigured, sendToOwner };
