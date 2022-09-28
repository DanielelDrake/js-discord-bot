const Discord = require("discord.js");
const config = require("./config.json");

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ]
  })



  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })


client.login(config.BOT_TOKEN);

