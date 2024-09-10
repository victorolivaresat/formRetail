// routes/dataFormRoutes.js
const express = require('express');
const router = express.Router();
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

router.post('/data-forms', authRequired, validateSchema(dataFormSchema), createDataForm);
router.get('/data-forms', getAllDataForms);
router.get('/data-forms/:id', getDataFormById);
router.put('/data-forms/:id', updateDataForm);
router.delete('/data-forms/:id', deleteDataForm);

module.exports = router;
