import { bot } from "../index.js";
export const bot_set_commands = async () => {
  await bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/first_station", description: "Загадка первой станции" },
  ]);
};
