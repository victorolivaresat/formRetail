// routes/dataFormRoutes.js
const express = require('express');
const router = express.Router();
const { getAllDataForms } = require('../app/controllers/dataFormController');

router.get('/data-forms', getAllDataForms);

module.exports = router;
