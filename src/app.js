const TelegramBot = require('node-telegram-bot-api');
const listCommands = require('./services/list-commands.js');
const getPublicIp = require('./services/get-public-ip.js');
const turnRetropieOff = require('./services/turn-off-retropie.js');
const _commands = require('./commands.js');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/commands|help/gi, async ({ chat: { id: chatId } }) => {
    try {
        const successMsg = await listCommands();
        bot.sendMessage(chatId, successMsg);
    }
    catch (e) {
        bot.sendMessage(chatId, e);
    }
});

bot.onText(_commands.on, ({ chat: { id: chatId } }) =>
    bot.sendMessage(chatId, `Yes, I'm here!`)
);

bot.onText(_commands.public_ip, async ({ chat: { id: chatId } }) => {
    try {
        const ip = await getPublicIp();
        bot.sendMessage(chatId, `Your current public IP address is ${ip}.`);
    }
    catch (e) {
        bot.sendMessage(chatId, 'Ooops, it seems like something went wrong!');
    }
});

bot.onText(_commands.retropie_off, async ({ chat: { id: chatId } }) => {
    const successMsg = await turnRetropieOff();
    bot.sendMessage(chatId, successMsg);
});
