import { createConnection } from 'mysql2';

createConnection({
    host:"localhost",
    debug: false,
    user: "Daniel",
    password: "Wirklichreal1?"
}).then((connection) => {
    connection.execute('CREATE TABLE Guilds(guildId Varchar(255))')
}).catch(err => console.log(err));
