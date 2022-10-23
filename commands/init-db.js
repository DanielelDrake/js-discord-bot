const { CLIENT_ID, GUILD_ID, BOT_TOKEN, MONGO_URL } = require('../config.json');
const { SlashCommandBuilder, Guild, Discord, Message} = require('discord.js')
const { connect } = require('mongoose');
const mongoose = require('mongoose');
let guild = Message.guild;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('db-init')
        .setDescription('Initialises the User-DB'),
    async execute(interaction) {
        //Verbindung zur Datenbank herstellen
        console.log('Connecting ...')
        await mongoose.connect(MONGO_URL, {
            keepAlive: true
        })
        console.log('Connected to DB')

        //user fetchen
        guild.members.forEach(member => console.log(member.user.username));

        //user in Datenbank eintragen

        console.log('-----------------------------------------')
    }
}

