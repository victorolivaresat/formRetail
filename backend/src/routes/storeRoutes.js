const storeController = require("../app/controllers/storeController");
const routes = require("express").Router();

// Middlewares
const authRequired = require("../app/middlewares/validateToken");

/**
 * @swagger
 * tags:
 * name: Stores
 * description: Stores API
 */
// Stores
routes.get("/stores", authRequired, storeController.getAllStores);
routes.get("/stores/:storeId", authRequired, storeController.getStoreDetails);

module.exports = routes;
