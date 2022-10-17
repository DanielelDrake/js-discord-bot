const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: mongoose.mongoose.SchemaTypes.String,
    discordId : {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    admin: mongoose.SchemaTypes.Boolean,
})

module.exports = mongoose.model('User', UserSchema);