const db = require('../db/setup.js');
const bcrypt = require('bcrypt');
const TokenService = require('../services/TokenService');

const user = {};

// a little involved
// mostly the same as express
// with the exception of inserting the token into res.locals
user.create = function(req, res, next) {
  const userInfo = req.body;
  const passwordDigest = bcrypt.hashSync(userInfo.password, 10);
  db
    .one(
      'INSERT INTO users (profile_avatar, hobbies, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *;',
      [null, null, userInfo.username, passwordDigest, 0]
    )
    .then(data => {
      // remove the password_digest since it's sensitive
      const { password_digest, ...userData } = data;
      res.locals.user = userData;
      const tokenData = {
        username: userData.username
      };

      // pass some bit of data into makeToken
      TokenService.makeToken(tokenData)
        .then(token => {
          console.log(token);
          res.locals.token = token; // pass the token into res.locals
          next(); // calling next()
        })
        .catch(next); // call next with error object
    })
    .catch(err => {
      console.log(`User Create failed: ${err}`);
      next();
    });
};

user.findById = (req, res, next) => {
  const id = req.params.id;
  db
    .one('SELECT * FROM users WHERE id = ${id};', { id: id })
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in user.findById. Error:', error);
      next(error);
    });
};

user.findByUsername = function(username) {
  return db.one('SELECT * FROM users WHERE username = $1;', [username]);
};

user.login = function(req, res, next) {
  const userInfo = req.body;

  // do the normal dance comparing password / password_digest
  user
    .findByUsername(userInfo.username)
    .then(userData => {
      const isAuthed = bcrypt.compareSync(
        userInfo.password,
        userData.password_digest
      );

      if (!isAuthed) {
        next();
      }

      // put userData into res.locals
      res.locals.user = userData;

      const data = {
        username: userData.username
      };

      // and pass it into makeToken
      TokenService.makeToken(data)
        .then(token => {
          res.locals.token = token; // set the token on res.locals
          next();
        })
        .catch(err => {
          next();
        });
    })
    .catch(err => {
      next();
    });
};

user.allUsers = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM users;')
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in user.allUsers. Error:', error);
      next(error);
    });
};

user.editUser = (req, res, next) => {
  db
    .one(
      'UPDATE users SET profile_avatar = $1, hobbies = $2 WHERE id = $3 RETURNING *;',
      [req.body.profile_avatar, req.body.hobbies, req.body.id]
    )
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in user.editUser pgpromise call, error:',
        err
      );
    });
};

user.deleteUser = (req, res, next) => {
  db
    .none('DELETE FROM users WHERE id = $1;', [req.params.id])
    .then(() => {
      console.log('user deleted');
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in user.deleteUser pgpromise call, error:',
        err
      );
    });
};

module.exports = user;
