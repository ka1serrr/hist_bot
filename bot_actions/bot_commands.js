import { state } from "../state/state.js";
import { bot } from "../index.js";
import { bot_options } from "./bot_options.js";
import { sequilize } from "../db.js";
import { User } from "../models/models.js";

export const start = async () => {
  try {
    await sequilize.authenticate();
    await sequilize.sync();
  } catch (e) {
    console.log("Произошла ошибка во время подключения к бд", e);
  }

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        if (!User.findOne({ chatId })) {
          await User.create({ chatId });
        }

        return await bot.sendMessage(
          chatId,
          `Привет! Это бот Нового Года 2024. Ответь правильно на все загадки, напиши своё стихотворение и получи приз`,
        );
      }

      if (text === "/first_station" || text.toLowerCase() === "первая станция") {
        // Проверка, ответил ли чел уже на этот вопрос или нет
        const user = await User.findOne({ chatId });
        // if (user.right_answers.indexOf("first_station") > -1) {
        //   return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        // }
        state.status = "first_station";
        console.log(user.right_answers);
        return await bot.sendMessage(
          chatId,
          `Вопрос: в истории встречалось много узников, однако самым загадочным по праву считается заключённый времён Людовика XIV по имени *******. Однако историки всегда оспаривали многочисленные мифы, ходящие вокруг личности этого человека. Поднимите и вы завесу тайны.`,
          bot_options,
        );
      }

      if (state.status === "first_station") {
        const user = await User.findOne({ chatId });
        if (text.toLowerCase() === "железная маска") {
          user.points += 1;
          user.right_answers = Array.from(new Set([...user.right_answers, "first_station"]));
          await user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Харош");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      return bot.sendMessage(chatId, "Прости, я тебя не понимаю :(");
    } catch (e) {
      return bot.sendMessage(chatId, "Произошла какая-то ошибочка)");
    }
  });

  bot.on("callback_query", (msg) => {
    state.status = "pending";
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Выбери снова другую загадку");
  });
};
