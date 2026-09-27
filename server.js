// Local development server. In production, Netlify serves public/ and runs
// the functions in netlify/functions; this mirrors that setup on one port.
require('dotenv').config();
const path = require('path');
const express = require('express');
const contact = require('./netlify/functions/contact');
const chat = require('./netlify/functions/chat');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function mount(route, fn) {
  app.post(route, async (req, res) => {
    const result = await fn.handler({ httpMethod: 'POST', body: JSON.stringify(req.body || {}) });
    res.status(result.statusCode).set(result.headers || {}).send(result.body);
  });
}

mount('/api/contact', contact);
mount('/api/chat', chat);

app.listen(PORT, () => {
  console.log(`ViralMoniPoint running at http://localhost:${PORT}`);
});
