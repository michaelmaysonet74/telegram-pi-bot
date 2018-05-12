'use strict';

const TelegramBot = require('node-telegram-bot-api');
const commands = require('./commands.js');

// Services
const listCommands = require('./services/list-commands.js');
const getPublicIp = require('./services/get-public-ip.js');
const turnRetropieOff = require('./services/turn-off-retropie.js');
const pivpn = require('./services/pivpn.js');

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/commands|help/gi, (msg) => {
	const chatId = msg.chat.id;
	listCommands(commands).then((success_msg) => {
  	bot.sendMessage(chatId, success_msg);
  });
});

bot.onText(commands.on, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Yes, I'm here!`);
});

bot.onText(commands.public_ip, (msg) => {
  const chatId = msg.chat.id;

  getPublicIp().then((ip) => {
  	bot.sendMessage(chatId, `Your current public IP address is ${ip}.`);
  }).catch((e) => {
	bot.sendMessage(chatId, 'Ooops, it seems like something went wrong! :(');
  });
});

bot.onText(commands.retropie_off, (msg) => {
  const chatId = msg.chat.id;

  turnRetropieOff().then((success_msg) => {
  	bot.sendMessage(chatId, success_msg);
  });
});

bot.onText(commands.list_vpn_clients, (msg) => {
	const chatId = msg.chat.id;

	pivpn.listClients().then((success_msg) => {
		bot.sendMessage(chatId, success_msg);
	});
});

bot.onText(commands.list_vpn_certs, (msg) => {
	const chatId = msg.chat.id;

	pivpn.listCerts().then((success_msg) => {
		bot.sendMessage(chatId, success_msg);
	});
});