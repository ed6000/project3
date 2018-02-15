const bcrypt = require('bcryptjs');

const db = require('../db/setup.js');

const user = {};

user.create = function(user) {
    const passwordDigest = bcrypt.hashSync(user.password, 10);
    return db.oneOrNone(
        'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *;',
        [user.username, passwordDigest]
    );
};

user.findCalendar = function(id) {
    return db.any(
        'SELECT * FROM users JOIN calendars ON users.id = calendars.user_id WHERE users.id = $1;',
        [id]
    );
};

user.findCalendarMiddleware = function(req, res, next) {
    const id = req.user.id;
    user
        .findCalendar(id)
        .then(data => {
            res.locals.calendar = data;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

user.findByUsername = function(username) {
    return db.one('SELECT * FROM users WHERE username = $1;', [username]);
};

user.findByUsernameMiddleware = function(req, res, next) {
    const username = req.user.username;
    user
        .findByUsername(username)
        .then(result => {
            res.locals.userData = result;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};



module.exports = user;
