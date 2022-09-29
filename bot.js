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
        if(msg.content === 'role pls') {
            console.log('roles updated')
           // msg.author.roles.add(author.guild.roles.cache.find(i => i.name === 'Member'))
        }
        else if(msg.content === 'test'){
            console.log('testing');
            msg.reply("testing")
        }
        else{
            console.log("random msg")
            console.log(msg)

        }
        
    }
    
})


client.login(config.BOT_TOKEN);

