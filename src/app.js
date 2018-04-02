const TelegramBot = require('node-telegram-bot-api');
const getPublicIp = require('./services/get-public-ip.js');
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

bot.onText(/ON?/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Yes, I'm here!`);
});

bot.onText(/.*public.*ip.*/gi, (msg) => {
  const chatId = msg.chat.id;

  getPublicIp().then((ip) => {
  	bot.sendMessage(chatId, `Your current public ip address is ${ip}.`);
  }).catch((e) => {
	bot.sendMessage(chatId, 'Ooops, it seems like something went wrong! :(');
  });
});
