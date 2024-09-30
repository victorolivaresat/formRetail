// controllers/dataFormController.js
const DataForm = require('../models/DataForm');
const sequelize = require("../../config/database");
const { QueryTypes } = require('sequelize');

// Crear un nuevo DataForm

// const createDataForm = async (req, res) => {
//   try {
//     const { numberDocumentClient, documentTypeId, promotionId } = req.body;

//     // Verificar si el cliente ya tiene la misma promoción
//     const existingDataForm = await DataForm.findOne({
//       where: {
//         numberDocumentClient,
//         documentTypeId,
//         promotionId
//       }
//     });

//     // if (existingDataForm) {
//     //   return res.status(400).json({ 
//     //     error: "El cliente ya tiene esta promoción registrada." 
//     //   });
//     // }

//     // Si no existe un registro duplicado, crear el nuevo DataForm
//     const dataForm = await DataForm.create(req.body);
//     res.status(201).json(dataForm);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating data form: " + error });
//   }

// };


const createDataForm = async (req, res) => {
  try {
    const { numberDocumentClient, documentTypeId, promotionId } = req.body;

    // Llamar al procedimiento almacenado para validar la promoción
    const validation = await sequelize.query(
      "EXEC [dbo].[sp_validateDataForm] @numberDocumentId = :numberDocumentId, @documentTypeId = :documentTypeId, @promotionId = :promotionId",
      {
        replacements: {
          numberDocumentId: numberDocumentClient,
          documentTypeId: documentTypeId,
          promotionId: promotionId
        },
        type: QueryTypes.RAW,
      }
    );

    // Verificar si el procedimiento almacenado devolvió un error
    if (validation && validation.error) {
      return res.status(400).json({ 
        error: validation.error.message || "Error al validar la promoción del cliente." 
      });
    }

    // Si la validación es exitosa, crear el nuevo DataForm
    const dataForm = await DataForm.create(req.body);
    res.status(201).json(dataForm);

  } catch (error) {
    console.error(error);

    // Reemplazar "SequelizeDatabaseError: " por una cadena vacía
    const errorMessage = error.message.replace('SequelizeDatabaseError: ', '');

    // Devolver solo el mensaje de error limpio
    return res.status(400).json({ error: errorMessage });
  }
};

module.exports = {
  createDataForm
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
