import { Sequelize } from "sequelize";

export const sequilize = new Sequelize("users1", "root", "root", {
  host: "master.c30e7a49-78a2-4fec-bef3-40fb984cd032.c.dbaas.selcloud.ru",
  port: "5432",
  dialect: "postgres",
});
