import { config } from "./config.js";
import Telegram from "node-telegram-bot-api";
import { start } from "./bot_actions/bot_commands.js";

const { token } = config;

export const bot = new Telegram(token, { polling: true });

start();
