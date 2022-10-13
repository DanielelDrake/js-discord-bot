const mongoose = require("mongoose")
require ("./config.js")


class Database {
    constructor() {
        this.connection = null;
    }

    connect() {
        console.log("Connecting to Database ....")

        mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Successfully connected to Database!");
            this.connection = mongoose.connection;
        }).catch(err => {
            console.error(err);
        })
    }
}

module.exports = Database;