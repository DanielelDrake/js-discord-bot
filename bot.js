const fs = require('node:fs');
const path = require('node:path');

const Discord = require("discord.js");
const config = require("./config.json");
const { MessageEmbed, makeURLSearchParams, EmbedBuilder, Client, GatewayIntentBits, Collection, messageLink, channelLink } = require("discord.js")
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const { connect } = require('mongoose');
const mongoose = require('mongoose');
const User = require('./schemas/UserSchema')

//command handling
client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

    console.log(interaction)
})


//async functions
client.on("ready", async () => {
    //DB-Connect
    await mongoose.connect(config.MONGO_URL, {
        keepAlive: true
    })
    console.log('Connected to DB')
    console.log(`Logged in as ${client.user.tag}!`)
    console.log('-----------------------------------------')
})

client.on("guildMemberAdd", async (member) => {
    member.guild.channels.reply("Welcome " + member.username + "!")

    //neuen User in der Datenbank anlegen
    console.log('neuen Datensatz für ' + member.username + ' anlegen ...');
    const newUser = await User.create({
        username: member.username,
        discordId: member.id,
        admin: false,
        joined_at: Date.now
    })
    console.log('neuen Datensatz für User: ' + member.username + ' angelegt')
    console.log('--------------------------------------------')
})

//prefix for commands
const prefix = "!";

//user commands -> prefix+commmand+arg
client.on("messageCreate", async (msg) => {

    if (msg.author.bot) return;
    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //comands:
    if (command === 'test') {
        console.log("test requested")
    }
    //Server-Status
    //eigene User Info
    //help
    //

    //admin commands
    if (command === 'ban') {
        //check for Admin-Permissions
        if (msg.member.roles.cache.has('1025086853742866532')) {
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
        console.log('---------------------------------------------------------')
    }
    if (command === 'kick') {
        //check for Admin-Permissions
        if (msg.member.roles.cache.has('1025086853742866532')) {
            //log the kick-attempt
            console.log(msg.author.username + " wants to kick somebody")
            //check for args
            if (!args.length) {
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
        console.log('---------------------------------------------------------')
    }
    if (command === 'db') {
        if (msg.member.roles.cache.has('1025086853742866532')) {
            console.log(msg.author.username + " is searching for User " + args[0])
            const res = await User.find({ username: args[0] });
            console.log('Username: ' + res[0].username)
            console.log('Users DiscordId: ' + res[0].discordId)
            console.log('Admin status: ' + res[0].admin)
            console.log('Member since: ' + res[0].joined_at)
            console.log('-------------------------------------------')
        } else {
            console.log(msg.author.username + " hat versucht auf die DB zuzugreifen!")
            msg.reply("Du hast nicht die nötigen Berechtigungen auf diesem Server!")
            console.log('-------------------------------------------')
        }

    }
    if (command === 'setmod') {

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

//login
client.login(config.BOT_TOKEN);

