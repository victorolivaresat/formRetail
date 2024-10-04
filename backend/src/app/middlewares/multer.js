const multer = require("multer");
const path = require("path");

// Configurar almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("image");

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al subir la imagen" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Imagen subida con éxito",
        filePath: `/images/${req.file.filename}`,
      });
  });
};

module.exports = {
  uploadImage,
};
