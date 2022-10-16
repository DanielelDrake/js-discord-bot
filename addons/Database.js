const MongoClient = require('mongodb').MongoClient

const MONGO_URL="mongodb://127.0.0.1:27017"

class Database {
    constructor() {
        this.connection = null;
    }

    connect() {
        console.log("Connecting to Database ....")
        MongoClient.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Successfully connected to Database!");
            this.connection = mongoose.connection;
        }).catch(err => {
            console.error(err);
        })
    }
}

module.exports = Database;