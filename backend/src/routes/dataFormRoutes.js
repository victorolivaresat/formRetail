// routes/dataFormRoutes.js
const express = require('express');
const routes = express.Router();
const {
  createDataForm,
  getAllDataForms,
  getDataFormById,
  updateDataForm,
  deleteDataForm,
} = require('../app/controllers/dataFormController');
const authRequired = require('../app/middleware/validateToken');
const { validateSchema } = require('../app/middleware/validateSchema');
const { dataFormSchema }  = require('../app/validators/dataFormSchema');

routes.post('/data-forms', authRequired, validateSchema(dataFormSchema), createDataForm);
routes.get('/data-forms', getAllDataForms);
routes.get('/data-forms/:id', getDataFormById);
routes.put('/data-forms/:id', updateDataForm);
routes.delete('/data-forms/:id', deleteDataForm);

module.exports = routes;
