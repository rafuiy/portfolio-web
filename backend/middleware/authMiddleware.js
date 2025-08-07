const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token kosong' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  if (err) {
    console.error('JWT error:', err); // Tambahkan ini
    return res.status(403).json({ message: 'Token tidak valid' });
  }
  console.log('User payload dari token:', user); // Tambahkan ini
  req.user = user;
  next();
});

};
