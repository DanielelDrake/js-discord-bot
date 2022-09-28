const Discord = require("discord.js");
const config = require("./config.json");

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ]
})

const prefix = "!";


client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", function(message) {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLocaleLowerCase();

    if(command == "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply('pong!');
        console.log('Message had the latency od ${timeTaken}ms.');
    }
})


client.login(config.BOT_TOKEN);

