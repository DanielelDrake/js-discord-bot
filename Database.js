const mysql = require('mysql2/promise');

mysql.createConnection({
    user: "Daniel",
    password: "Wirklichreal1?"
}).then(() => console.log('goof')).catch(err => console.log(err));
