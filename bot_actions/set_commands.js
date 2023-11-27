export const bot_set_commands = (bot) => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/Первая станция", description: "Загадка первой станции" },
  ]);
};
