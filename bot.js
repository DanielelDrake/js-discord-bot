const Discord = require("discord.js");
const config = require("./config.json");

const { Client, GatewayIntentBits, messageLink, channelLink } = require('discord.js');
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const prefix = "!";


client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", (msg) => {
    if(msg.author.bot) {
        return
    } else {
        
        if(msg.content === 'test'){
            console.log('testing');
            msg.reply("testing")
        }else {
            console.log("random msg")
            console.log(msg)

        }
        
    }
    
})


client.login(config.BOT_TOKEN);

