// config.js
import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

const DEV_PORT = 8080;

const DBS = {
  mongo: "MONGODB",
  memory: "MEMORY",
  filesystem: "FILE",
  sql: "SQL",
  mariadb: "MARIADB"
}

const config = {
  envs,
  admin_email: process.env.ADMIN_EMAIL,
  mail_auth_user: process.env.MAIL_AUTH_USER,
  mail_auth_pass: process.env.MAIL_AUTH_PASS,
  mail_from: process.env.MAIL_FROM,
  persistences:DBS,
  server: {
    PORT: process.env.PORT ?? DEV_PORT,
    MODE: process.env.MODE,
    routes: {
      base: "/api",
      productos:"/api/productos",
      carrito:"/api/carrito",
      sessions: "/api/sessions",
      orders: "/api/ordenes"
    },
    SESSION: {
      SECRET_KEY: process.env.SESSION_KEY,
    },
    JWT: {
      SECRET_KEY: process.env.JWT_SECRET_KEY,
    },
  }
}

export default config;