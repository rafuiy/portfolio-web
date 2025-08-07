const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/projects'); // tujuan penyimpanan
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `project-${Date.now()}${ext}`;
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
