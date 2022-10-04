const { messageLink } = require("discord.js")

module.exports = {
    timeOnServer: function (msg) {
        console.log('Time on Server requested for User: ' + msg.author.username)
    }

}