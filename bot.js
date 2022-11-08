const fs = require('node:fs');
const path = require('node:path');
const { connect } = require('mongoose');
const mongoose = require('mongoose');
const User = require('./schemas/UserSchema')
const Discord = require("discord.js");
const config = require("./config.json");
const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
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
        console.log(`${interaction.commandName} command was run by ${interaction.user.username}`)
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
    
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
    //console.log(*Datensatz von Datenbank abrufen*)
    console.log('--------------------------------------------')
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

