const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    discordId : {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    admin: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
    },
    mod: {
        type: mongoose.SchemaTypes.Boolean,
        required: false,
    },
    joined_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
})

module.exports = mongoose.model('User', UserSchema);