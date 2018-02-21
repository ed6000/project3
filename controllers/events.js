const events = require('../models/events.js');
const router = require('express').Router();



router.get('/', events.allEvents, (req, res) => {
  res.json(res.locals.events);
});

router.get('/:id', events.findById, (req, res) => {
  res.json(res.locals.event);
});

router.post('/', events.addEvent, (req, res) => {
  res.json(res.locals.event);
});

router.post('/addYelp', events.addYelp, (req, res) => {
  res.json(res.locals.yelp);
});

router.post('/addBook', events.addBook, (req, res) => {
  res.json(res.locals.books);
});

router.post('/addTicket', events.addTicket, (req, res) => {
  res.json(res.locals.tickets);
});

router.put('/:id', events.editEvent, (req, res) => {
  res.json(res.locals.event);
});

router.delete('/:id', events.deleteEvent, (req, res) => {
  res.send('event deleted');
});

module.exports = router;