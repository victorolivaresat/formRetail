const routes = require('express').Router();
const authRoutes = require('./authRoutes');
const storeRoutes = require('./storeRoutes');
const promotionRoutes = require('./promotionRoutes');
const documentTypeRoutes = require('./documentTypeRoutes');
const dataFormRoutes = require('./dataFormRoutes');

routes.use(authRoutes);
routes.use(storeRoutes);
routes.use(promotionRoutes);
routes.use(dataFormRoutes);
routes.use(documentTypeRoutes);

module.exports = routes;
