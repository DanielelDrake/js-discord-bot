var test = require('./commands_test.js');
var ping = require('./commands_tictactoe.js');
var userInfo = require('./commands_userInfo.js')

const Discord = require("discord.js");
const config = require("./config.json");
const { MessageEmbed, makeURLSearchParams, EmbedBuilder } = require("discord.js")

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

    if (msg.author.bot) return;

    //messages:
    if (msg.content === 'hello') {
        console.log('hello requested by: ' + msg.author.username)
        msg.channel.send("hello " + "" + msg.author.username + "!")
    }
    if (msg.content === 'test') {
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

    if (command === 'test') {
        test.test()
    }

    if (command === 'TimeOnServer') {
        console.log('TimeOnServer requested by: ' + msg.author.username)
        commands_userInfo.memberSince(msg);
    }

    if (command === 'help') {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('My Bot')
            .setURL('https://github.com/DanielelDrake/js-discord-bot')
            .setAuthor({ name: 'Daniel', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://github.com/DanielelDrake/js-discord-bot' })
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Commands:', value: 'For all commands use the prefix "!"' },
                { name: '\u200B', value: '\u200B' },
                { name: 'help', value: 'see this modal', inline: false },
                { name: 'ping', value: 'lose in ping pong', inline: false },
            )
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: false })
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        msg.channel.send({ embeds: [exampleEmbed] });

    }

})

client.login(config.BOT_TOKEN);

