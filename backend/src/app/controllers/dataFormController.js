// controllers/dataFormController.js
const DataForm = require('../models/DataForm');

const getAllDataForms = async (req, res) => {
  try {
    const dataForms = await DataForm.findAll();
    res.status(200).json({
      success: true,
      data: dataForms,
    });
  } catch (error) {
    console.error('Error fetching data forms:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data forms',
    });
  }
};

module.exports = {
  getAllDataForms,
};
