const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join('public', 'uploads', 'techstacks');
    try {
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `techstack-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

// Filter hanya gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Hanya file gambar yang diizinkan'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
