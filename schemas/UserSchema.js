const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.mongoose.SchemaTypes.String,
        required: true,
    },
    discordId : {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    admin: mongoose.SchemaTypes.Boolean,
    mod: mongoose.SchemaTypes.Boolean,
    joined_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
})

module.exports = mongoose.model('User', UserSchema);