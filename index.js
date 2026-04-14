const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

// 👉 এখানে তোমার Telegram user ID দাও (admin)
const adminId = 6954490579; 

// 👉 এখানে তোমার Telegram profile link দাও
const contactLink = "t.me/Rifat204BD";

const bot = new TelegramBot(token, { polling: true });

let users = [];

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const name = msg.from.first_name || "No Name";
    const username = msg.from.username ? "@" + msg.from.username : "No Username";

    if (!users.includes(chatId)) {
        users.push(chatId);
    }

    const position = users.indexOf(chatId) + 1;

    // 👉 Admin কে notify
    bot.sendMessage(adminId,
`📢 New User Joined!

👤 Name: ${name}
🔗 Username: ${username}
🏆 Position: ${position}`);

    // 🎉 1st user
    if (position === 1) {
        bot.sendMessage(chatId,
`🎉 অভিনন্দন! 🎉

আপনি ১ম হয়েছেন 🥇  
আপনার জন্য bot একদম FREE বানিয়ে দেওয়া হবে 🤖🔥  

👉 Contact করুন: ${contactLink}`);
    }

    // 🥈 2nd & 3rd
    else if (position === 2 || position === 3) {
        bot.sendMessage(chatId,
`🎉 অভিনন্দন! 🎉  

আপনি ${position} নম্বরে নির্বাচিত হয়েছেন 🏆  
আপনার জন্য minimum charge এ bot বানানো হবে 💰  

👉 Contact করুন: ${contactLink}`);
    }

    // ❌ others
    else {
        bot.sendMessage(chatId,
`😔 দুঃখিত!  

আপনি ${position} নম্বরে আছেন  
এই offer এর জন্য আপনি নির্বাচিত হননি ❌  

আপনাকে full payment এ bot নিতে হবে 💰  

👉 Contact করুন: ${contactLink}`);
    }
});
