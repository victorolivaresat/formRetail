// routes/documentTypeRoutes.js
const express = require("express");
const router = express.Router();
const { getAllDocumentTypes } = require("../app/controllers/documentTypeController");
// Middlewares
const authRequired = require("../app/middleware/validateToken");

router.get("/document-types", authRequired, getAllDocumentTypes);

module.exports = router;
