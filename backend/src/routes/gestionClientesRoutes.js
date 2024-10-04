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
const authRequired = require("../app/middlewares/validateToken");

routes.get('/clientes', authRequired, getAllClientes);
routes.get('/clienteas/:id', authRequired, getClienteById);
routes.get('/clientes/document/:id/:documentTypeId',  authRequired, getClienteByNumDoc);
routes.post('/clientes',  authRequired, createCliente);
routes.put('/clientes/:id',  authRequired, updateCliente);
routes.delete('/clientes/:id',  authRequired, deleteCliente);

module.exports = routes;
