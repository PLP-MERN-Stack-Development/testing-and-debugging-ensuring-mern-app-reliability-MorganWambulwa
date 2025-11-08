// server/src/utils/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
const JWT_EXPIRES_IN = '1h';

function generateToken(user) {
  // Accept either mongoose doc or plain object with _id
  const payload = { id: user._id ? user._id.toString() : user.id };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const token = auth.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ message: 'Invalid token' });
  req.user = { id: decoded.id };
  next();
}

module.exports = { generateToken, verifyToken, authMiddleware };
