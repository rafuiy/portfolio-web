const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    // 🔑 Buat token
    const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login berhasil',
      token, // kirim token ke frontend
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};
