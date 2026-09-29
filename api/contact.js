// Vercel serverless entry for POST /api/contact. Reuses the Netlify handler so
// both hosts (and server.js locally) run the same code.
const { handler } = require('../netlify/functions/contact');

module.exports = async (req, res) => {
  const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  const result = await handler({ httpMethod: req.method, body });
  for (const [key, value] of Object.entries(result.headers || {})) res.setHeader(key, value);
  res.status(result.statusCode).send(result.body);
};
