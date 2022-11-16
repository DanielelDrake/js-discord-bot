const { CLIENT_ID, GUILD_ID, BOT_TOKEN, MONGO_URL } = require('../config.json');
const { SlashCommandBuilder, GUILD_MEMBERS, Guild, Discord, Message, PermissionFlagsBits, Client } = require('discord.js')
const { connect } = require('mongoose');
const mongoose = require('mongoose');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('db-init')
        .setDescription('Initialises the User-DB')
        .setDefaultMemberPermissions(PermissionFlagsBits.Admin),
    async execute(interaction) {
        //Verbindung zur Datenbank herstellen
        console.log('Connecting ...')
        await mongoose.connect(MONGO_URL, {
            keepAlive: true
        })
        console.log('Connected to DB')

        //user fetchen
        const membersArr = await interaction.guild.fetch().catch(console.error);
        console.log(membersArr.members);

        //user in Datenbank eintragen

        console.log('-----------------------------------------')

        interaction.reply("finished!")
    }
}
