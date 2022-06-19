import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_NAME,
  //DB_PORT,
  DB_DIALECT
} = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    //port: DB_PORT,
    dialect: DB_DIALECT
});
 
export default db;