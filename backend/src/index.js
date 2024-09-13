const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const http = require("http");
require("dotenv").config();
const config = require("../config");
const app = express();

// Puerto de la aplicación
const port = process.env.PORT || 7000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use('/attachments', express.static(path.join(__dirname, '../src/assets/attachments')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Función para habilitar CORS
app.use(
  cors({
    origin: config.CORS.ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

/**
 * Socket
 */
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: config.CORS.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

/*Routers*/
app.use("/api/v1", routes);

// Start server
server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});


const req = { io };

