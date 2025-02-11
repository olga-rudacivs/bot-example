const TelegramApi = require("node-telegram-bot-api");

const {gameOptions, againOptions} = require('./options.js')

const token = "7993623557:AAFf1PxaSjm83sPtDpN5vBt8xi7fgXF11ZA";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    ` я загадаю цифру, а ты отгадывай(цифра от 0 до 9)`
  );
  const randomNum = Math.floor(Math.random() * 10);
  chats[chatId] = randomNum;
  await bot.sendMessage(chatId, "отгадывай", gameOptions);
};

function start() {
  bot.setMyCommands([
    { command: "/start", description: "приветствие" },
    { command: "/info", description: "информация" },
    { command: "/game", description: "игра" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendMessage(chatId, `hello, я пепе`);
      return bot.sendMessage(
        chatId,
        "https://tlgrm.ru/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/3.jpg"
      );
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `${msg.from.first_name}, ты не пепе, я пепе`);
    }
    if (text === "/game") {
     return startGame(chatId) }
    return bot.sendMessage(chatId, "я не понял ниче");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

  if(data === '/again'){
return startGame(chatId)
    }
    if (data == chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `ты угадал! это ${chats[chatId]}!!!`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `не то, я загадал ${chats[chatId]}`,
        againOptions
      );
    }

    console.log(msg);
  });
}

start();
