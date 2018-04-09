const TelegramBot = require('node-telegram-bot-api');
const getPublicIp = require('./services/get-public-ip.js');
const turnRetropieOff = require('./services/turn-off-retropie.js');

// api.openweathermap.org/data/2.5/weather?q={city name}

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {
	polling: true
});

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//
//   bot.sendMessage(chatId, 'Received your message');
// });

bot.onText(/ON\?/i, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Yes, I'm here!`);
});

bot.onText(/.*public.*ip.*/gi, (msg) => {
  const chatId = msg.chat.id;

  getPublicIp().then((ip) => {
  	bot.sendMessage(chatId, `Your current public IP address is ${ip}.`);
  }).catch((e) => {
	bot.sendMessage(chatId, 'Ooops, it seems like something went wrong! :(');
  });
});

bot.onText(/.*retropie.*off.*|.*shut.*down.*retropie.*/gi, (msg) => {
  const chatId = msg.chat.id;

  turnRetropieOff().then((success_msg) => {
  	bot.sendMessage(chatId, success_msg);
  });
});
