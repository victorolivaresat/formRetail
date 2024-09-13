// controllers/gestionClientesController.js
const GestionClientes = require("../models/gestionCliente");
const sequelize = require("../../config/database");
const { QueryTypes } = require('sequelize');

const getAllClientes = async (req, res) => {
  try {
    const clientes = await GestionClientes.findAll();
    res.status(200).json({
      success: true,
      data: clientes,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching clients",
    });
  }
};

const getClienteById = async (req, res) => {
  try {
    const cliente = await GestionClientes.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching client",
    });
  }
};

const getClienteByNumDoc = async (req, res) => {
  try {
    const { id: numberdocumentId, documentTypeId } = req.params;

    const cliente = await sequelize.query(
      "EXEC sp_gestionClienteGet :numberdocumentId, :documentTypeId",
      {
        replacements: { numberdocumentId, documentTypeId },
        type: QueryTypes.SELECT,
      }
    );

    if (!cliente || cliente.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      data: cliente,
    });
    
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching client",
    });
  }
};

const createCliente = async (req, res) => {
  try {
    const newCliente = await GestionClientes.create(req.body);
    res.status(201).json({
      success: true,
      data: newCliente,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({
      success: false,
      message: "Error creating client",
    });
  }
};

const updateCliente = async (req, res) => {
  try {
    const cliente = await GestionClientes.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await cliente.update(req.body);
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({
      success: false,
      message: "Error updating client",
    });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const cliente = await GestionClientes.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await cliente.destroy();
    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting client",
    });
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  getClienteByNumDoc,
};
