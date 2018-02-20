const goodreads = require('../models/goodreads.js');
const router = require('express').Router();

router.get('/', goodreads.queryBooks, (req, res) => {
  console.log('hitting /addevent');
  res.json(res.locals.queryBooks)
  })

module.exports = router;

