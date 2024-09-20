const storeController = require("../app/controllers/storeController");
const routes = require("express").Router();

// Middlewares
const authRequired = require("../app/middleware/validateToken");

/**
 * @swagger
 * tags:
 * name: Stores
 * description: Stores API
 */
// Stores
routes.get("/stores", authRequired, storeController.getAllStores);
routes.get("/allFalt/:storeId", authRequired, storeController.getAllUsers1);

module.exports = routes;
