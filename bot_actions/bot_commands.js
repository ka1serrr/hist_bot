import { state } from "../state/state.js";
import { bot } from "../index.js";
import { bot_options } from "./bot_options.js";
import { sequilize } from "../db.js";
import { User } from "../models/models.js";

let points = 0;
let right_answers = [];
export const start = async () => {
  // try {
  //   await sequilize.authenticate();
  //   await sequilize.sync();
  // } catch (e) {
  //   console.log("Произошла ошибка во время подключения к бд", e);
  // }

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const answersChat = "993952594";
    const { first_name, last_name, username } = msg?.from;

    try {
      if (text === "/start") {
        // if (!User.findOne({ chatId })) {
        //   await User.create({ chatId });
        // }
        console.log(msg);

        return await bot.sendMessage(
          chatId,
          `Привет! Это бот Нового Года 2024. Ответь правильно на все загадки, напиши своё стихотворение и получи приз`,
        );
      }

      if (text === "/pending" || text.toLowerCase() === "выбрать другой вопрос") {
        state.status = "pending";
        return await bot.sendMessage(chatId, `Теперь выбери другую загадку`);
      }

      if (text === "/reading_room" || text.toLowerCase() === "читальный зал") {
        // Проверка, ответил ли чел уже на этот вопрос или нет
        // const user = await User.findOne({ chatId });
        if (right_answers.indexOf("reading_room") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }
        state.status = "reading_room";
        return await bot.sendPhoto(chatId, `https://ibb.co/ssX0znP`, {
          caption: `Дайте ответы на вопросы. Напишите их через ЗАПЯТУЮ с ПРОБЕЛОМ.
          `,
        });
      }

      if (state.status === "reading_room") {
        // const user = await User.findOne({ chatId });
        if (text.toLowerCase() === "алексей михайлович, стокгольм, киев") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "reading_room"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: Уж щиплет шаловливо щеки");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // ! Код перехода

      if (text === "/trans" || text.toLowerCase() === "переход") {
        // Проверка, ответил ли чел уже на этот вопрос или нет
        // const user = await User.findOne({ chatId });
        if (right_answers.indexOf("trans") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }
        state.status = "trans";
        return await bot.sendMessage(
          chatId,
          `Вопрос: в истории встречалось много узников, однако самым загадочным по праву считается заключённый времён Людовика XIV по имени *******. Однако историки всегда оспаривали многочисленные мифы, ходящие вокруг личности этого человека. Поднимите и вы завесу тайны.`,
        );
      }

      if (state.status === "trans") {
        // const user = await User.findOne({ chatId });
        if (text.toLowerCase() === "железная маска") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "trans"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: Декабрьский утренний мороз.");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // ! Код гардероба

      if (text === "/dressing_room" || text.toLowerCase() === "гардероб") {
        // Проверка, ответил ли чел уже на этот вопрос или нет
        // const user = await User.findOne({ chatId });
        if (right_answers.indexOf("dressing_room") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }
        state.status = "dressing_room";
        return await bot.sendPhoto(chatId, `https://ibb.co/L68qRgK`, {
          caption: "Реши ребус и получи ещё одну строчку стиха!",
        });
      }

      if (state.status === "dressing_room") {
        // const user = await User.findOne({ chatId });
        if (text.toLowerCase() === "мандарин") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "dressing_room"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: И сессия, грозясь серьезно.");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // ! Кофейня у гардероба

      if (text === "/coffee" || text.toLowerCase() === "кофейня") {
        // Проверка, ответил ли чел уже на этот вопрос или нет
        // const user = await User.findOne({ chatId });
        if (right_answers.indexOf("coffee") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }
        state.status = "coffee";
        return await bot.sendMessage(
          chatId,
          `Напиши год рождения человека-аббревиатуры (по первым буквам): 
          \nЖёлтый цитрусовый фрукт? 
          \nГород, где умерла Цветаева? 
          \nКруг над головой святого? 
          \nНаша оп? 
          \nОстановка поединка у борцов?
`,
        );
      }

      if (state.status === "coffee") {
        // const user = await User.findOne({ chatId });
        if (text.toLowerCase() === "1870") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "coffee"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: Как на голову снег, студенту валится на нос.");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // ! Лестница корпуса А

      if (text === "/ladder_a" || text.toLowerCase() === "лестница") {
        // Проверка, ответил ли чел уже на этот вопрос или нет
        // const user = await User.findOne({ chatId });
        if (right_answers.indexOf("ladder_a") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }
        state.status = "ladder_a";
        return await bot.sendPhoto(chatId, `https://ibb.co/CnB526P`, {
          caption: `Реши кроссворд: 
            \n1. Центр крупной вечевой республики.
            \n2. Наплечный отличительный предмет в виде шнура, пренадлженность фирменной (чаще военной) одежды
            \n3. "Скотий бог" в славянской мифологии
            \n4. Праздник, который был заменён Новым годом в СССР
            \n5. Важный и неотъемлемый этап студенчества
            \n6. Чем некультурнее были люди, тем культурнее.
          `,
        });
      }

      if (state.status === "ladder_a") {
        if (text.toLowerCase() === "оливье") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "ladder_a"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: Но сердце полно уже сладкой зимней сказкой.");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // !  Дворик

      if (text === "/yard" || text.toLowerCase() === "дворик") {
        // Проверка, ответил ли чел уже на этот вопрос или нет
        // const user = await User.findOne({ chatId });
        if (right_answers.indexOf("yard") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }
        state.status = "yard";
        return await bot.sendPhoto(chatId, `https://ibb.co/C8yWwCc`, {
          caption: `Разгадайте судоку: 
          \nИз цифр в серых клеточках вы получите годы жизни культового режиссера и дату выхода фильма, в котором ОН использует известное полотно Питера Брейгеля старшего, в названии, которого фигурирует актуальное время года. Назовите этого режиссера. (ФИ)
          `,
        });
      }

      if (state.status === "yard") {
        if (text.toLowerCase() === "андрей тарковский") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "yard"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: И словно бой курантов песнь его.");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // ! Коворк
      if (text === "/coworking" || text.toLowerCase() === "коворкинг") {
        if (right_answers.indexOf("coworking") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }

        state.status = "coworking";
        return await bot.sendPhoto(chatId, `https://ibb.co/Yb1yqrj`, {
          caption: `Задание: 
          \nОтгадать слово с помощью указанных в тексте цифр. Каждой цифре соответствует своя буква на циферблате.
          \nВ календаре студента-историка декабрь. Приближается не только Новый год, но и зимняя сессия. На календаре 12 декабря, На носу 11 дедлайнов, сдавать 12 экзаменов – вроде сентябрь недавно был… Просыпается ночью студент-историк в 2 ночи в холодном поту – ему приснилось, что Ладынин добавил к экзамену еще 10 билетов. Фух, вроде сон. А потом как вспомнил, что до экзамена 7 дней, а он только на 4 семинарах был. Испугался, сел готовиться с утра, ведь в пятницу еще на Новый год в школе исторических наук идти…
         
          `,
        });
      }

      if (state.status === "coworking") {
        if (text.toLowerCase() === "дедлайн" || text.toLowerCase() === "дэдлайн") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "coworking"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: Под звон лихой кружится все в веселом танце,");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // ! Cтоловка

      if (text === "/dining_room" || text.toLowerCase() === "столовая") {
        if (right_answers.indexOf("dining_room") > -1) {
          return bot.sendMessage(chatId, "Ты уже ответил на этот вопрос");
        }

        state.status = "dining_room";
        return await bot.sendPhoto(chatId, `https://ibb.co/mN4bqcs`, {
          caption: `Узнайте любимых преподавателей в образах дедов Морозов. Ответом станет слово состоящее из 1 буквы фамилии первого «деда», 4 и 9 букв фамилии третьего, 7-ой  третьего и 2 -ой четвертого.
          `,
        });
      }

      if (state.status === "dining_room") {
        if (text.toLowerCase() === "икона") {
          points += 1;
          right_answers = Array.from(new Set([...right_answers, "dining_room"]));
          // user.save();
          state.status = "pending";
          return bot.sendMessage(chatId, "Молодец, вот твоя строчка: Ждет снега, чуда и подарка заодно.");
        }
        return bot.sendMessage(chatId, "Ты ответил неправильно, попробуй ещё :(");
      }

      // ! Отправить стишок

      if (text === "/send_poem" || text.toLowerCase() === "отправить стишок") {
        if (points === 8) {
          if (right_answers.indexOf("send_poem") > -1) {
            return bot.sendMessage(chatId, "Ты уже отправил свой стишок");
          }

          state.status = "sending_poem";
          return bot.sendMessage(
            chatId,
            "А теперь поборись за главный приз - допиши к стихотворению свое четверостишье. По итогам голосования жюри, лучшие варианты будут зачитываться со сцены актового зала во время новогоднего представления, а их авторы получат призы.",
          );
        }

        return bot.sendMessage(chatId, "Ты ответил не на все вопросы :(");
      }

      if (state.status === "sending_poem") {
        right_answers = Array.from(new Set([...right_answers, "sending_poem"]));
        points = 0;
        await bot.sendMessage(chatId, "Дорогой друг, спасибо за участие, с Новым годом!");
        return bot.sendMessage(
          answersChat,
          `Пришёл стишок от ${first_name} ${last_name} @${username}: 
          ${text}
        `,
        );
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
