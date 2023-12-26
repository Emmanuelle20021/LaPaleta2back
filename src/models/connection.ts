import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "../../config/db_config";
import Role from "./role";
import User from "./user";
import Product from "./product";
import Order from "./order";
import Cooler from "./cooler";
import Subcategory from "./subcategory";
import Category from "./category";

const sequelize = new Sequelize({
  repositoryMode: true,
  database: dbConfig.DATABASE,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  dialect: "mysql",
  port: dbConfig.PORT,
  models: [Role, User, Product, Order, Cooler, Subcategory, Category],
});

sequelize.sync().then(() => console.log('sync done'));

export default sequelize;
