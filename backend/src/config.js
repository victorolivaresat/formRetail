// config.js
module.exports = {
  DATABASE: {
    NAME: "formularioPromociones",
    USER: "totalsecureApp",
    PASSWORD: "WJZ66$V@eNqCKRGuG*ZY",
    HOST: "192.168.21.35",
    DIALECT: "mssql",
    PORT: 1433,
    DIALECT_OPTIONS: {
      options: {
        encrypt: false,
        trustServerCertificate: false,
        useUTC: false, 
      },
    },
  },
  JWT: {
    SECRET_KEY: "secret",
    EXPIRES_IN: "1d",
  },
  CORS: {
    ORIGIN: "http://localhost:5173",
    // ORIGIN: "http://192.168.21.35",
  },
};
