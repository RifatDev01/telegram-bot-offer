const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = process.env.BOT_TOKEN;

// 👉 তোমার Telegram user ID
const adminId = 6954490579;

// 👉 তোমার profile link
const contactLink = "https://t.me/Rifat204BD";

const bot = new TelegramBot(token, { polling: true });

let users = [];

// 🌐 Web server (Render URL check)
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("🤖 Bot is running successfully!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 🤖 Bot system
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const name = msg.from.first_name || "No Name";
    const username = msg.from.username ? "@" + msg.from.username : "No Username";

    if (!users.includes(chatId)) {
        users.push(chatId);
    }

    const position = users.indexOf(chatId) + 1;

    // 👉 শুধু 1st–3rd হলে admin notify
    if (position <= 3) {
        bot.sendMessage(adminId,
`🔥 New Selected User!

👤 Name: ${name}
🔗 Username: ${username}
🏆 Position: ${position}`);
    }

    // 🎉 1st user
    if (position === 1) {
        bot.sendMessage(chatId,
`🎉 অভিনন্দন! 🎉

আপনি ১ম হয়েছেন 🥇  
আপনার জন্য bot একদম FREE বানানো হবে 🤖🔥  

👉 Contact করুন: ${contactLink}`);
    }

    // 🥈 2nd & 3rd
    else if (position === 2 || position === 3) {
        bot.sendMessage(chatId,
`🎉 অভিনন্দন! 🎉  

আপনি ${position} নম্বরে নির্বাচিত হয়েছেন 🏆  
Minimum charge এ bot বানানো হবে 💰  

👉 Contact করুন: ${contactLink}`);
    }

    // ❌ others
    else {
        bot.sendMessage(chatId,
`😔 দুঃখিত!  

আপনি ${position} নম্বরে আছেন ❌  
এই offer শেষ হয়ে গেছে  

👉 Full payment এ bot নিতে হবে 💰  
👉 Contact করুন: ${contactLink}`);
    }
});
