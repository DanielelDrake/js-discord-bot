const mysql = require('mysql2');

mysql.createConnection({
    host:"localhost",
    debug: false,
    user: "Daniel",
    password: "Wirklichreal1?"
}).then(() => console.log('goof')).catch(err => console.log(err));
