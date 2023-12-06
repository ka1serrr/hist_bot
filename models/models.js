import { sequilize } from "../db.js";
import { DataTypes } from "sequelize";

export const User = sequilize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  chatId: { type: DataTypes.INTEGER, unique: true },
  current_state: { type: DataTypes.STRING, defaultValue: "reading_room" },
});
