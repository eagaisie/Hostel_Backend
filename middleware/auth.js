// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // { id, email, role }
    next();
  });
}

// for admin‐only routes
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
}

module.exports = { authenticateToken, requireAdmin };
