'use strict';

const TelegramBot = require('node-telegram-bot-api');
const _commands = require('./commands.js');

// Services
const listCommands = require('./services/list-commands.js');
const getPublicIp = require('./services/get-public-ip.js');
const turnRetropieOff = require('./services/turn-off-retropie.js');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/commands|help/gi, (msg) => {
  const chatId = msg.chat.id;

  listCommands().then((success_msg) => {
    bot.sendMessage(chatId, success_msg);
  }).catch(e => bot.sendMessage(chatId, e));
});

bot.onText(_commands.on, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Yes, I'm here!`);
});

bot.onText(_commands.public_ip, (msg) => {
  const chatId = msg.chat.id;

  getPublicIp().then((ip) => {
  	bot.sendMessage(chatId, `Your current public IP address is ${ip}.`);
  }).catch((e) => {
	bot.sendMessage(chatId, 'Ooops, it seems like something went wrong! :(');
  });
});

bot.onText(_commands.retropie_off, (msg) => {
  const chatId = msg.chat.id;

  turnRetropieOff().then((success_msg) => {
  	bot.sendMessage(chatId, success_msg);
  });
});
