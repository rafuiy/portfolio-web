const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  jwt.verify(token, 'RAHASIA_JWT_KAMU', (err, user) => {
    console.log("SECRET FROM ENV:", process.env.JWT_SECRET);

    if (err) return res.status(403).json({ message: 'Token tidak valid' });

    if (user.role !== 'admin') {
      console.log('Decoded JWT:', user);
      return res.status(403).json({ message: 'Akses hanya untuk admin' });
    }

    req.user = user;
    next();
  });
};
