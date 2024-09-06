// routes/documentTypeRoutes.js
const express = require("express");
const router = express.Router();
const { getAllDocumentTypes } = require("../app/controllers/documentTypeController");

router.get("/document-types", getAllDocumentTypes);

module.exports = router;
