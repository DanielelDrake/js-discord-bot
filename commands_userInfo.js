const { messageLink } = require("discord.js")

module.exports = {
    memberSince: function (msg) {
        const time = msg.author.time
        return time;
        console.log('Time on Server sent for User: ' + msg.author.username)


    }
}