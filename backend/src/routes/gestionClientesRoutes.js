// routes/gestionClientesRoutes.js
const express = require('express');
const routes = express.Router();
const {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  getClienteByNumDoc,
} = require('../app/controllers/gestionClienteController');

routes.get('/clientes', getAllClientes);
routes.get('/clienteas/:id', getClienteById);
routes.get('/clientes/document/:id/:documentTypeId', getClienteByNumDoc);
routes.post('/clientes', createCliente);
routes.put('/clientes/:id', updateCliente);
routes.delete('/clientes/:id', deleteCliente);

module.exports = routes;
