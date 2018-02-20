const gbooks = require('../models/gbooks.js');
const router = require('express').Router();

router.post('/', gbooks.queryBooks, (req, res) => {
  console.log('hitting /addevent');
  res.json(res.locals.bookData)
  })

module.exports = router;