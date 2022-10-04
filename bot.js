var test = require('./commands_test.js');
var ping = require('./commands_tictactoe.js');
var userInfo = require('./commands_userInfo.js')
var userInfo = require('./commands_info.js')


const Discord = require("discord.js");
const config = require("./config.json");
const { MessageEmbed, makeURLSearchParams } = require("discord.js")

const { Client, GatewayIntentBits, Collection, messageLink, channelLink } = require('discord.js');
const commands_userInfo = require('./commands_userInfo.js');
const commands_info = require('./commands_info.js');
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

client.on("messageCreate", (msg) => {

    if(msg.author.bot) return;

    //messages:
    if(msg.content === 'hello') {
        console.log('hello requested by: ' + msg.author.username)
        msg.channel.send("hello " + "" + msg.author.username + "!")
    }
    if(msg.content === 'test') {
        console.log('testing')
    }

    
    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //comands:
    if (command === 'ping') {
        console.log("ping-pong Match requested by " + msg.author.username)
        msg.reply("pong!")
      }
    if(command === 'test') {
        test.test()
    }
    if(command === 'TimeOnServer') {
        console.log('TimeOnServer requested by: ' + msg.author.username)
        commands_userInfo.memberSince(msg);
    }
    if(command === 'help') {
        console.log("command List requested by " + msg.author.username)
        channel.send(commands_info.commandList())
    }
    
})

client.login(config.BOT_TOKEN);

