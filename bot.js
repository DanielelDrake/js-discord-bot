const Discord = require("discord.js");
const config = require("./config.json");

const { Client, GatewayIntentBits, messageLink, channelLink } = require('discord.js');
const client = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ]
});

const prefix = "!";


client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", (msg) => {

    const message = msg.content

    if(msg.author.bot) {
        return
    } else {
        console.log('message created: ${message}')
        msg.reply("hello")
    }
    
})


client.login(config.BOT_TOKEN);

