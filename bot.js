var commands = require('./commands.js');

const Discord = require("discord.js");
const config = require("./config.json");
const { MessageEmbed, makeURLSearchParams, EmbedBuilder } = require("discord.js")


const { Client, GatewayIntentBits, Collection, messageLink, channelLink } = require('discord.js');
const { connect } = require('mongoose');
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const dbEdit = require("./addons/DatabaseEdit");
const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: 'localhost', 
     user:'Daniel', 
     password: 'Wirklichreal1?',
     database: 'DiscordUsers',
     port: '/var/run/mysqld/mysqld.sock',
     connectionLimit: 5
});



//async functions
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("guildMemberAdd", (member) => {
    member.guild.channels.reply("Welcome " + member.username + "!")
})

//prefix for commands
const prefix = "$";

//user commands prefix+commmand+arg
client.on("messageCreate", (msg) => {

    if (msg.author.bot) return;
    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //comands:
    if (command === 'test') {
        console.log("test requested")
        commands.test()
    }

    if (command === 'time') {
        console.log('TimeOnServer requested by: ' + msg.author.username)

        msg.reply(msg.author.id)
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
                { name: 'Commands:', value: 'For all commands use the prefix "$"' },
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

    if(command === 'db') {
        console.log("Database Testing!")

        pool.query(`SELECT * FROM user`, (err, result, fields) => {
            if(err){
                throw err;
            }
            return console.log(result)
        })

        console.log("Database Test is done!")
    }

    //admin commands
    if(command === 'ban') {
        //check for Admin-Permissions
        if(msg.member.roles.cache.has('1025086853742866532')) {
            //log the ban-attempt
            console.log(msg.author.username + " wants to ban somebody")
            //check for args
            if (!args.length) {
                return msg.reply(`You didn't provide any arguments, ${msg.author}!`);
            }
            else {
                //perform ban
                let victim = msg.mentions.members.first();
                msg.reply("User " + victim.user.username + " got banned by " + msg.author.username) 
                victim.ban();
                
            }
        }
        else {
            //respond with error message
            msg.reply("Da hast du wohl nicht die nötigen Rechte... Wende dich an einen Admin!")
        }
    }
    if(command === 'kick') {
        //check for Admin-Permissions
        if(msg.member.roles.cache.has('1025086853742866532')) {
            //log the kick-attempt
            console.log(msg.author.username + " wants to kick somebody")
            //check for args
            if(!args.length) {
                return msg.reply("You didn't provide any Arguments!")
            }
            else {
                //perform the kick
                let victim = msg.mentions.members.first();
                msg.reply("User " + victim.user.username + " got kicked by " + msg.author.username) 
                victim.kick();
            }
        }
        else {
            //respond with error message
            msg.reply("Da hast du wohl nicht die nötigen Rechte... Wende dich an einen Admin!")
        }
    }
})

//passive Chat-Moderation
client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;

    if (msg.content.includes("Asshole")) {
        console.log("Insult by -" + msg.author.username + "- detected!")
        msg.reply("first Strike!")
    }
})

client.login(config.BOT_TOKEN);

