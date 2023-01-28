const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({
    intents: ['Guilds',
        "DirectMessages",
        'GuildMessages', "MessageContent"],
    partials: [Discord.Partials.Message, Discord.Partials.Channel]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
    if (msg.content === "ping") {
        msg.reply("Pong!");
    }
});

client.login(config.token);