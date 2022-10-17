const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: mongoose.mongoose.SchemaTypes.String,
    discordId : {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    admin: mongoose.SchemaTypes.Boolean,
    joined_at: mongoose.SchemaTypes.Date,
})

module.exports = mongoose.model('User', UserSchema);