const db = require('../db/setup.js');

const user = {};

user.findById = (req, res, next) => {
  const id = req.params.id;
  db
    .one(
      'SELECT * FROM users WHERE id = ${id};',
      { id: id }
    )
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in user.findById. Error:', error);
      next(error);
    });
};

user.addUser = (req, res, next) => {
    console.log('in addUser model', req.body.username, req.body.password);
  db
    .one(
      'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *;',
      [req.body.username, req.body.password]
    )
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in user.addUser pgpromise call, error:',
        err
      );
    });
};


user.editUser = (req, res, next) => {
  db
    .one(
      'UPDATE users SET username = $1, password_digest = $2 WHERE id = $3 RETURNING *;',
      [req.body.username, req.body.password, req.params.id]
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
    .none(
      'DELETE FROM users WHERE id = $1;',
      [req.params.id]
    )
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
