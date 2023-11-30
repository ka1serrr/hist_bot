import { config } from "./config.js";
import Telegram from "node-telegram-bot-api";
import { start } from "./bot_actions/bot_commands.js";
import { bot_set_commands } from "./bot_actions/set_commands.js";

const { token } = config;

export const bot = new Telegram(token, { polling: true });

bot_set_commands();
start();
