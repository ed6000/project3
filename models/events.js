const db = require('../db/setup.js');

const events = {};

events.allEvents = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM events;')
    .then(data => {
      res.locals.events = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in events.allEvents. Error:', error);
      next(error);
    });
};

events.findById = (req, res, next) => {
  const id = req.params.id;
  db
    .one(
      'SELECT * FROM events WHERE id = ${id};',
      { id: id }
    )
    .then(data => {
      res.locals.event = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in events.findById. Error:', error);
      next(error);
    });
};

events.addEvent = (req, res, next) => {
  db
    .one(
      'INSERT INTO events (user_id, title, start, end_time) VALUES ($1, $2, $3, $4) RETURNING *;',
      [1, req.body.title, req.body.start, req.body.end_time]
    )
    .then(data => {
      res.locals.event = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in events.addEvent pgpromise call, error:',
        err
      );
    });
};


events.editEvent = (req, res, next) => {
  db
    .one(
      'UPDATE events SET title = $1, start = $2, end_time = $3 WHERE id = $4 RETURNING *;',
      [req.body.title, req.body.start, req.body.end_time, req.params.id]
    )
    .then(data => {
      res.locals.event = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in events.editEvent pgpromise call, error:',
        err
      );
    });
};

events.deleteEvent = (req, res, next) => {
  db
    .one(
      'DELETE FROM events WHERE id = $1',
      [req.params.id]
    )
    .then(() => {
      console.log('event deleted');
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in events.deleteEvent pgpromise call, error:',
        err
      );
    });
};


module.exports = events;
