import { state, answers } from "../state/state.js";
import { bot } from "../index.js";
import { bot_options } from "./bot_options.js";
import { sequilize } from "../db.js";
import { User } from "../models/models.js";

let points = 0;
let right_answers = [];
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
    const answersChat = "993952594";
    const { first_name, last_name, username } = msg?.from;

    try {
      if (text === "/start") {
        if (await !User.findOne({ chatId })) {
          await User.create({ chatId });
        }

        return await bot.sendMessage(
          chatId,
          `Привет! Это бот Нового Года 2024. Ответь правильно на все загадки, напиши своё стихотворение и получи приз. Начало квеста находится в Читальном Зале. Сканируй там QR-код и напиши ответ на загадку в следующем сообщении!`,
        );
      }

      // if (text === "/first_place" || text.toLowerCase() === "первая загадка") {
      //   // Проверка, ответил ли чел уже на этот вопрос или нет
      //   // const user = await User.findOne({ chatId });
      //   state.status = "reading_room";
      //   return await bot.sendMessage(
      //     chatId,
      //     `Отгадай, где находится первая загадка, после того:
      //     \nКуда стремится каждый уважающий себя студент на большой перемене в 12:30?
      //     \nПосле того, как ты нашёл место, дай на неё ответ следующим сообщением
      //     `,
      //   );
      // }

      const user = await User.findOne({ chatId });
      await console.log(user.status);
      // ! ЧЗ?
      if (user?.status === "reading_room") {
        if (text.toLowerCase() === "алексей михайлович, стокгольм, киев") {
          user.status = "search_trans";
          await user.save();
          points += 1;
          return bot.sendMessage(
            chatId,
            `Правильно, вот первая строчка стиха:
          \nУж щиплет шаловливо щеки
          
          \nТеперь тебе нужно угадать, где находится следующий этап квеста и написать сюда!         
          \nРассказ Джеральда Дарелла, в котором главный герой оказался на пересечении двух реальностей. Разграничением между нашей и жуткой реальностями стали зеркала….
          \nПодсказка:_____ из Л в В
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      // ! Переход

      if (user?.status === "search_trans") {
        if (
          text.toLowerCase() === "переход из л в в" ||
          text.toLowerCase() === "переход л в" ||
          text.toLowerCase() === "переход л в в" ||
          text.toLowerCase() === "переход из корпуса л в в" ||
          text.toLowerCase() === "переход из корпуса л в корпус в" ||
          text.toLowerCase() === "переход из л в корпус в" ||
          text.toLowerCase() === "переход"
        ) {
          user.status = "trans";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно! Теперь в следующем сообщении напиши ответ на загадку, которую ты можешь увидеть, перейдя по QR-коду!
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      if (user?.status === "trans") {
        if (text.toLowerCase() === "железная маска") {
          points += 1;
          user.status = "search_dressing_room";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно, вот вторая строчка стиха:
          \nДекабрьский утренний мороз.
          
          \nТеперь тебе нужно угадать, где находится следующий этап квеста и написать сюда!         
          \nТут каждый скоро скинет маску,
Влекомый знанием, оставит шарф, перчатки, может, даже зонт.
Бродя среди рядов и цифр искомых, 
Он следующей загадки знак отыщет влет.

          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      // ! Гардероб

      if (user?.status === "search_dressing_room") {
        if (
          text.toLowerCase() === "гардероб" ||
          text.toLowerCase() === "переодевалка" ||
          text.toLowerCase() === "раздевалка"
        ) {
          user.status = "dressing_room";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно! Теперь в следующем сообщении напиши ответ на загадку, которую ты можешь увидеть, перейдя по QR-коду!
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      if (user?.status === "dressing_room") {
        if (text.toLowerCase() === "мандарин") {
          points += 1;
          user.status = "search_coffee";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно, вот третья строчка стиха:
          \nИ сессия, грозясь серьезно,
          
          \nТеперь тебе нужно угадать, где находится следующий этап квеста и написать сюда!         
          \nПетечка - Вовочке: - Тебе мать на обед даёт столько деньжищ. А мою не проведёшь, она звонит в столовую на 2 этаже и узнаёт, почем сендвичи. - Моя тоже регулярно звонит и спрашивает: "Почём у вас сендвичи?". - А как же ты её постоянно дуришь? - Только один раз обманул. Она у меня номер столовой спросила, а я ей телефон ... дал.
Куда звонила мама Вовочки?
          \nP.S. Там продают хотдоги
          `,
          );
        }

        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      // ! Кофейня

      if (user?.status === "search_coffee") {
        if (
          text.toLowerCase() === "кофейня" ||
          text.toLowerCase() === "кофейня у гардероба" ||
          text.toLowerCase() === "буфет" ||
          text.toLowerCase() === "буфет у гардероба" ||
          text.toLowerCase() === "столовая у гардероба" ||
          text.toLowerCase() === "столовая с хотдогами"
        ) {
          user.status = "coffee";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно! Теперь в следующем сообщении напиши ответ на загадку, которую ты можешь увидеть, перейдя по QR-коду!
          `,
          );
        }

        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      if (user?.status === "coffee") {
        if (text === "1870" || text === 1870 || text.toLowerCase() === "тысяча восеьмсот семдесят") {
          points += 1;
          user.status = "search_ladder";
          await user.save();
          return bot.sendPhoto(chatId, "https://ibb.co/KxDPv5D", {
            caption: `Правильно, вот четвёртая строчка стиха:
          \nКак на голову снег, студенту валится на нос.
          
          \nТеперь тебе нужно угадать, где находится следующий этап квеста и написать сюда! 
          \nПодсказка:связано с главным корпусом Басмача. ПОД ____ А :)
          `,
          });
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      // ! Лестница

      if (user?.status === "search_ladder") {
        if (
          text.toLowerCase() === "под лестницей корпуса а" ||
          text.toLowerCase() === "лестница корпуса а" ||
          text.toLowerCase() === "лестница а"
        ) {
          user.status = "ladder";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно! Теперь в следующем сообщении напиши ответ на загадку, которую ты можешь увидеть, перейдя по QR-коду!
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      if (user?.status === "ladder") {
        if (text.toLowerCase() === "оливье") {
          points += 1;
          user.status = "search_yard";
          await user.save();
          return bot.sendPhoto(chatId, "https://ibb.co/hCQn1QK", {
            caption: `Правильно, вот пятая строчка стиха:
          \nНо сердце полно уже сладкой зимней сказкой,
          
          \nТеперь тебе нужно угадать, где находится следующий этап квеста и написать сюда! 
          `,
          });
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      // ! Дворик

      if (user?.status === "search_yard") {
        if (
          text.toLowerCase() === "дворик" ||
          text.toLowerCase() === "внутренний дворик" ||
          text.toLowerCase() === "двор" ||
          text.toLowerCase() === "внутренний двор"
        ) {
          user.status = "yard";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно! Теперь в следующем сообщении напиши ответ на загадку, которую ты можешь увидеть, перейдя по QR-коду!
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      if (user?.status === "yard") {
        if (text.toLowerCase() === "тарковский" || text.toLowerCase() === "андрей тарковский") {
          points += 1;
          user.status = "search_cowork";
          await user.save();
          return bot.sendPhoto(chatId, "https://ibb.co/L1gMrgs", {
            caption: `Правильно, вот шестая строчка стиха:
          \nИ словно бой курантов песнь его.
          
          \nТеперь тебе нужно угадать, где находится следующий этап квеста и написать сюда!
          \nВолк, не тот, кто Волк, а тот, кто в перерыв бежит work  в …. 
          `,
          });
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      // ! Коворикнг

      if (user?.status === "search_cowork") {
        if (text.toLowerCase() === "коворкинг" || text.toLowerCase() === "коворк") {
          user.status = "cowork";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно! Теперь в следующем сообщении напиши ответ на загадку, которую ты можешь увидеть, перейдя по QR-коду!
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      if (user?.status === "cowork") {
        if (text.toLowerCase() === "дедлайн" || text.toLowerCase() === "дэдлайн" || text.toLowerCase() === "deadline") {
          points += 1;
          user.status = "search_dining_room";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно, вот седьмая строчка стиха:
          \nПод звон лихой кружится все в веселом танце,
          
          \nТеперь тебе нужно угадать, где находится следующий этап квеста и написать сюда!         
          \nКуда стремится каждый уважающий себя студент на большой перемене в 12:30?
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      // ! Столовая
      if (state?.status === "search_dining_room") {
        if (text.toLowerCase() === "столовая" || text.toLowerCase() === "столовка" || text.toLowerCase() === "буфет") {
          user.status = "dining_room";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Правильно! Теперь в следующем сообщении напиши ответ на загадку, которую ты можешь увидеть, перейдя по QR-коду!
          `,
          );
        }
        return bot.sendMessage(chatId, answers.wrong_answer);
      }

      if (user?.status === "dining_room") {
        if (text.toLowerCase() === "икона") {
          points += 1;
          user.status = "send_poem";
          await user.save();
          return bot.sendMessage(
            chatId,
            `Молодец, ты со всем справился! А теперь поборись за главный приз - допиши к стихотворению СВОЁ четверостишье. По итогам голосования жюри, лучшие варианты будут зачитываться со сцены актового зала во время новогоднего представления, а их авторы получат призы (четверостишье можно ввести один раз). Если  не хочешь получить секретный приз, напиши любое сообщение :)
          `,
          );
        }
      }

      if (user?.status === "send_poem") {
        user.status = "pending";
        await user.save();
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
      return bot.sendMessage(chatId, "Произошла какая-то ошибочка) " + e);
    }
  });

  bot.on("callback_query", (msg) => {
    state.status = "pending";
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Выбери снова другую загадку");
  });
};
