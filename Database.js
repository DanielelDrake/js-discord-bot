const mysql = require('mysql2/promise');

mysql.createConnection({
    host:"localhost",
    debug: false,
    user: "Daniel",
    password: "Wirklichreal1?"
}).then(() => console.log('goof')).catch(err => console.log(err));
