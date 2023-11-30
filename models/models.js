import { sequilize } from "../db.js";
import { DataTypes } from "sequelize";

export const User = sequilize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  chatId: { type: DataTypes.STRING, unique: true },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  right_answers: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
});
