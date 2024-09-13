const routes = require('express').Router();
const authRoutes = require('./authRoutes');
const storeRoutes = require('./storeRoutes');
const promotionRoutes = require('./promotionRoutes');
const documentTypeRoutes = require('./documentTypeRoutes');
const dataFormRoutes = require('./dataFormRoutes');
const gestionClientesRoutes = require('./gestionClientesRoutes');

routes.use(authRoutes);
routes.use(storeRoutes);
routes.use(promotionRoutes);
routes.use(dataFormRoutes);
routes.use(documentTypeRoutes);
routes.use(gestionClientesRoutes);

module.exports = routes;
