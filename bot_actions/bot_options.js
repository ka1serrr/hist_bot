export const bot_options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Выбрать другую загадку", callback_data: "/pending" }]],
  }),
};
