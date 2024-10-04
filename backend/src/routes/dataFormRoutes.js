// routes/dataFormRoutes.js
const express = require("express");
const { uploadImage } = require("../app/middlewares/multer");
const routes = express.Router();
const {
  createDataForm,
  getAllDataForms,
  getDataFormById,
  updateDataForm,
  deleteDataForm,
} = require("../app/controllers/dataFormController");
const authRequired = require("../app/middlewares/validateToken");
const { validateSchema } = require("../app/middlewares/validateSchema");
const { dataFormSchema } = require("../app/validators/dataFormSchema");

routes.post(
  "/data-forms",
  authRequired,
  validateSchema(dataFormSchema),
  createDataForm
);
routes.get("/data-forms", getAllDataForms);
routes.get("/data-forms/:id", getDataFormById);
routes.put("/data-forms/:id", updateDataForm);
routes.delete("/data-forms/:id", deleteDataForm);
routes.post('/upload', uploadImage);

module.exports = routes;
