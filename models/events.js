const axios = require('axios');
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
    .any('SELECT * FROM events WHERE user_id = ${id};', { id: id })
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
  console.log('req.body is ', req.body);
  db
    .one(
      'INSERT INTO events (user_id, title, start, end_time) VALUES ($1, $2, $3, $4) RETURNING *;',
      [req.body.id, req.body.title, req.body.start, req.body.end_time]
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

events.addYelp = (req, res, next) => {
  zip = req.body.zip;
  axios({
    method: 'get',
    url: `http://api.yelp.com/v3/businesses/search?term=food&location===${zip},usa&limit=5`,
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  })
    .then(response => {
      res.locals.yelp = response.data.businesses;
      next();
    })
    .catch(error => {
      console.log('error encountered in events.addYelp. error: ', error);
      next(error);
    });
};

events.addBook = (req, res, next) => {
  const keyword = req.body.keyword;
  axios({
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
  })
    .then(response => {
      res.locals.books = response.data.items;
      console.log('response: ', response.data.items);
      next();
    })
    .catch(error => {
      console.log('error encountered in events.addBook error: ', error);
      next(error);
    });
};

events.addTicket = (req, res, next) => {
  city = req.body.city;
  axios({
    method: 'get',
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${
      process.env.TICKET_KEY
    }&size=5&city=${city}`
  })
    .then(response => {
      res.locals.tickets = response.data._embedded.events;
      next();
    })
    .catch(error => {
      console.log('error encountered in events.addTicket, error: ', error);
      next(error);
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
    .one('DELETE FROM events WHERE id = $1 RETURNING *', [req.params.id])
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
