const ticket = require('../models/ticket.js');
const router = require('express').Router();

router.post('/', ticket.queryFiveEvents, (req, res) => {
  console.log('hitting /addevent with ticketmaster');
  res.json(res.locals.ticketData)
  })

module.exports = router;
