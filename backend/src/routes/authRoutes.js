const authController = require('../app/controllers/authController');
const routes = require('express').Router();

// Middlewares
const { validateSchema } = require('../app/middlewares/validateSchema');
const { loginSchema } = require("../app/validators/authSchema");

/**
 * @swagger 
 * tags:
 * name: Auth
 * description: Auth API
 */
// Auth
routes.post("/auth/login", validateSchema(loginSchema), authController.login);
routes.get("/auth/verify-token", authController.verifyToken);
routes.post("/auth/logout", authController.logout);

routes.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

module.exports = routes;