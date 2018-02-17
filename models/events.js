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
      'INSERT INTO events (user_id, event_time, event) VALUES ($1, $2, $3);',
      [req.body.user_id, req.body.event_time, req.body.event]
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
      'UPDATE events SET event_time = $1, event = $2 WHERE id = $3;',
      [req.body.event_time, req.body.event, req.params.id]
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
      'DELETE FROM events WHERE id = $1 RETURNING id;',
      [req.params.id]
    )
    .then(data => {
      res.locals.event = data;
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
