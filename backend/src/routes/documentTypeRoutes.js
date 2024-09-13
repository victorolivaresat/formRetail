// routes/documentTypeRoutes.js
const express = require("express");
const routes = express.Router();
const { getAllDocumentTypes } = require("../app/controllers/documentTypeController");
// Middlewares
const authRequired = require("../app/middleware/validateToken");

routes.get("/document-types", authRequired, getAllDocumentTypes);

module.exports = routes;
