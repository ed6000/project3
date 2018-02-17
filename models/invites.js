const db = require('../db/setup.js');

const invites = {};

invites.allInvites = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM invites;')
    .then(data => {
      res.locals.invite = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in invites.allInvites. Error:', error);
      next(error);
    });
};

invites.findById = (req, res, next) => {
  const id = req.params.id;
  db
    .one(
      'SELECT * FROM invites WHERE id = ${id};',
      { id: id }
    )
    .then(data => {
      res.locals.invite = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in invites.findById. Error:', error);
      next(error);
    });
};

invites.addInvite = (req, res, next) => {
  db
    .one(
      'INSERT INTO invites (user_id_creator, user_id_invitee, event_id_creator, event_id, confirmation) VALUES ($1, $2, $3, $4, null) RETURNING *;',
      [req.body.user_id_creator, req.body.user_id_invitee, req.body.event_id_creator, req.body.event_id]
    )
    .then(data => {
      res.locals.invite = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in invites.addInvite pgpromise call, error:',
        err
      );
    });
};


invites.accept = (req, res, next) => {
  db
    .one(
      'UPDATE invites SET confirmation = true WHERE id = $1 RETURNING *;',
      [req.params.id]
    )
    .then(data => {
      res.locals.invite = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in invites.accept pgpromise call, error:',
        err
      );
    });
};

invites.decline = (req, res, next) => {
  db
    .one(
      'UPDATE invites SET confirmation = false WHERE id = $1 RETURNING *;',
      [req.params.id]
    )
    .then(data => {
      res.locals.invite = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in invites.decline pgpromise call, error:',
        err
      );
    });
};

invites.deleteInvite = (req, res, next) => {
  db
    .one(
      'DELETE FROM invites WHERE id = $1',
      [req.params.id]
    )
    .then(() => {
      console.log('invite deleted');
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in invites.deleteInvite pgpromise call, error:',
        err
      );
    });
};


module.exports = invites;
