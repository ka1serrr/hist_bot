import { Sequelize } from "sequelize";

export const sequilize = new Sequelize("users", "root", "root", {
  host: "master.151693eb-5677-42ad-9a25-92a82a993b8d.c.dbaas.selcloud.ru",
  port: "5432",
  dialect: "postgres",
});
