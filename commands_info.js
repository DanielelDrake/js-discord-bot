module.exports = {
    commandList: function () {
        let embed = new MessageEmbed()
            .setTitle("Command List")
            .setDescription("!help, !roll, !kick, !ban")
            .setColor("RANDOM")
        message.channel.send(embed)
    }
}