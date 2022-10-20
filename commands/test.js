const { SlashCommandBuilder} = require('discord.js')
const { execute } = require('./user')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing if the Bot is responding'),
    async execute(interaction) {
        await interaction.reply('testing')
    }
}