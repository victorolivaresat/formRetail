const promotionController = require("../app/controllers/promotionController");
const routes = require("express").Router();

// Middleware (opcional, dependiendo de si necesitas protección para esta ruta)
const authRequired = require("../app/middlewares/validateToken");

/**
 * @swagger
 * tags:
 * name: Promotions
 * description: Promotions API
 */

// Obtener todas las promociones
routes.get("/promotions", authRequired, promotionController.getAllPromotions);

module.exports = routes;
