const Discord = require("discord.js");
const { getConfig } = require("@confly-dev/confly-js");
const config = require("./config.json");

const client = new Discord.Client({
  intents: ["Guilds", "DirectMessages", "GuildMessages", "MessageContent"],
  partials: [Discord.Partials.Message, Discord.Partials.Channel],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getConfig(config.confly_token).then((conflyConfig) => {
    console.log("Current confly config: ");
    console.log(conflyConfig);
  });
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  const conflyConfig = (await getConfig(config.confly_token)).Main.config;

  if (!conflyConfig.enabled) return;
  if (msg.content === conflyConfig.trigger) {
    msg.reply(conflyConfig.response);
  }
});

client.login(config.discord_token);
