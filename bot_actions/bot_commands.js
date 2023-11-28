import { state } from "../state/state.js";
import { bot } from "../index.js";
import { bot_options } from "./bot_options.js";

let scores = 0
export const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;


    if (text === "/start") {

      return await bot.sendMessage(
        chatId,
        `Привет! Это бот Нового Года 2024. Ответь правильно на все загадки, напиши своё стихотворение и получи приз`,
      );
    }

    if (text === '/first_station' || text.toLowerCase() === "первая станция") {
      state.status = "first_station"
      console.log(scores)
      return await bot.sendMessage(chatId, "Загадка первой станции", bot_options)
    }

    if (state.status === 'first_station') {
      if (text === "1") {
        scores += 1
        console.log(scores)
        return bot.sendMessage(chatId, "Харош")
      }
    }

    return bot.sendMessage(chatId, "Прости, я тебя не понимаю :(");
  });

  bot.on("callback_query", msg => {
    state.status = 'pending'
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Выбери снова другую загадку")
  })
};
