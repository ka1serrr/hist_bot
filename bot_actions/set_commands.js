import { bot } from "../index.js";
export const bot_set_commands = async () => {
  await bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/reading_room", description: "Загадка читального зала" },
    { command: "/trans", description: "Загадка перехода из Л в В" },
    { command: "/dressing_room", description: "Загадка гардероба" },
    { command: "/coffee", description: "Загадка кофейни" },
    { command: "/ladder_a", description: "Загадка под лестницей корпуса А" },
    { command: "/yard", description: "Загадка внутреннего дворика" },
    { command: "/coworking", description: "Загадка коворка" },
    { command: "/dining_room", description: "Загадка столовой" },
    { command: "/send_poem", description: "Отправить свой стишок" },
    { command: "/pending", description: "Выбери другой вопрос" },
  ]);
};
