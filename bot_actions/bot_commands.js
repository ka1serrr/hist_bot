// import { state } from "../state/state.js";

const state = [{}];
export const start = (bot) => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    // state[chatId].status = { ...state, status: "pending" };

    if (text === "/start") {
      console.log(state);
      return await bot.sendMessage(
        chatId,
        `Привет! Это бот Нового Года 2024. Ответь правильно на все загадки, напиши своё стихотворение и получи приз`,
      );
    }

    if (text === "/первая станция") {
      state[chatId] = { ...state.chat, status: "first_station" };
      console.log(state);
      return await bot.sendMessage(chatId, `ЗАГАДКА ПЕРВОЙ СТАНЦИИ`);
    }

    if (text === "/вторая станция") {
      // state.chat = { ...state.chat, status: "second_station" };
      console.log(state);
      return await bot.sendMessage(chatId, "Вторая");
    }

    // if (state.chat.status === "first_station") {
    //   // await bot.sendMessage(chatId, state[chatId].status);
    //   if (text === "Ответ 1") {
    //     // state[chatId].points += 1;
    //     return await bot.sendMessage(chatId, "Да! Ты правильно ответил, молодец!");
    //   }
    //   return await bot.sendMessage(chatId, "Этот ответ неверный :(");
    // }

    return bot.sendMessage(chatId, "Прости, я тебя не понимаю :(");
  });
};
