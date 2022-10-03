const Discord = require("discord.js");
const config = require("./config.json");

const { Client, GatewayIntentBits, Collection, messageLink, channelLink } = require('discord.js');
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
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();




client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`)
})

client.on("guildMemberRemove", () => {
    console.log('Member removed!')
})

client.on("guildMemberAdd", (member) => {
    member.guild.channels.reply("Welcome!")
})

client.on("messageCreate", (msg, member) => {
    if(msg.author.bot) {
        return
    } 
    else {
        if (msg.content.startsWith(prefix + 'command')){
            console.log("command detected")
            if(command == 'ping') {
                console.log('ping-command detected')
                msg.channel.reply('pong!')
            }
        }
        else{
            console.log("random msg by: "  + msg.author.username + ": " + msg.content)

        }
        
    }
    
})

client.login(config.BOT_TOKEN);

