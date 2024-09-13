// controllers/dataFormController.js
const DataForm = require('../models/DataForm');

// Crear un nuevo DataForm

const createDataForm = async (req, res) => {
  try {
    const { numberDocumentClient, documentTypeId, promotionId } = req.body;

    // Verificar si el cliente ya tiene la misma promoción
    const existingDataForm = await DataForm.findOne({
      where: {
        numberDocumentClient,
        documentTypeId,
        promotionId
      }
    });

    if (existingDataForm) {
      return res.status(400).json({ 
        error: "The client already has this promotion registered." 
      });
    }

    // Si no existe un registro duplicado, crear el nuevo DataForm
    const dataForm = await DataForm.create(req.body);
    res.status(201).json(dataForm);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating data form" });
  }
};

// Leer todos los DataForms
const getAllDataForms = async (req, res) => {
  try {
    const dataForms = await DataForm.findAll();
    res.status(200).json(dataForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data forms" });
  }
};

// Leer un DataForm por ID
const getDataFormById = async (req, res) => {
  try {
    const dataForm = await DataForm.findByPk(req.params.id);
    if (dataForm) {
      res.status(200).json(dataForm);
    } else {
      res.status(404).json({ error: "DataForm not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data form" });
  }
};

// Actualizar un DataForm por ID
const updateDataForm = async (req, res) => {
  try {
    const dataForm = await DataForm.findByPk(req.params.id);
    if (dataForm) {
      await dataForm.update(req.body);
      res.status(200).json(dataForm);
    } else {
      res.status(404).json({ error: "DataForm not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error updating data form" });
  }
};

// Eliminar un DataForm por ID (soft delete)
const deleteDataForm = async (req, res) => {
  try {
    const dataForm = await DataForm.findByPk(req.params.id);
    if (dataForm) {
      await dataForm.destroy();
      res.status(200).json({ message: "DataForm deleted" });
    } else {
      res.status(404).json({ error: "DataForm not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting data form" });
  }
};

module.exports = {
  createDataForm,
  getAllDataForms,
  getDataFormById,
  updateDataForm,
  deleteDataForm,
};
