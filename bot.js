import express from 'express';

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

client.on('messageCreate', (msg) => {
    if(msg.author.bot){
        return;
    }

    if(msg.content === 'hello') {
        msg.reply("world!");
    }
})



client.login(config.BOT_TOKEN);

