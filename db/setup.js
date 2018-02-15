const pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'calendar_db'
};

const db = pgp(cn);

module.exports = db;