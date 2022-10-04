var test = require('./commands.js');

const Discord = require("discord.js");
const config = require("./config.json");
const { MessageEmbed, makeURLSearchParams, EmbedBuilder } = require("discord.js")

const { Client, GatewayIntentBits, Collection, messageLink, channelLink } = require('discord.js');
const commands = require('./commands.js');
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});


//async functions
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("guildMemberRemove", (member) => {
    console.log(member.username + ' was removed!')
})

client.on("guildMemberAdd", (member) => {
    member.guild.channels.reply("Welcome " + member.username + "!")
})


//prefix for commands
const prefix = "!";

client.on("messageCreate", (msg) => {

    if (msg.author.bot) return;
    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //comands:
    if (command === 'test') {
        commands.test()
    }

    if (command === 'time') {
        console.log('TimeOnServer requested by: ' + msg.author.username)

        msg.reply("" + commands_userInfo.memberSince(msg))
    }

    if (command === 'help') {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('My Bot')
            .setURL('https://github.com/DanielelDrake/js-discord-bot')
            .setAuthor({ name: 'Daniel', iconURL: 'https://i.imgur.com/AfFp7pu.png', 
                url: 'https://github.com/DanielelDrake/js-discord-bot' })
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Commands:', value: 'For all commands use the prefix "!"' },
                { name: '\u200B', value: '\u200B' },
                { name: 'help', value: 'see this modal', inline: false },
                { name: '...', value: '...', inline: false },
            )
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: false })
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        msg.channel.send({ embeds: [exampleEmbed] });

    }

    if(command === 'rl-server') {
        console.log('Server Status for Rocket League requested')
    }
})

client.login(config.BOT_TOKEN);

