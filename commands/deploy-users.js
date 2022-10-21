const {SlashCommandBuilder} = require('discord.js')
const { execute } = require('./ping')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dbUpdate')
        .setDescription('add all current users to a database'),
    async execute(interaction) {
        const newUser = await User.create({
            username: member.username,
            discordId: member.id,
            admin: false,
            joined_at: Date.now
        })
        await interaction.reply('executed!')
    }
}