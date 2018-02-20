const yelp = require('../models/yelp.js');
const router = require('express').Router();

router.post('/', yelp.queryFiveRestaurants, (req, res) => {
  console.log('hitting /addevent');
  res.json(res.locals.yelpData)
  })

module.exports = router;

