const axios = require('axios');
const Yelp = {};

Yelp.queryFiveRestaurants = (req, res, next) => {
  zip = req.body.zip;
  axios({
  method: "get",
  url: `http://api.yelp.com/v3/businesses/search?term=food&location===${zip},usa&limit=5`,
  headers:{
    Authorization:
      `Bearer ${process.env.YELP_KEY}`
  }
})
  .then(response => {
    res.locals.yelpData = response.data.businesses;
    console.log('response: ', response.data.businesses);
    next();
  })
  .catch(error => {
    console.log('error encountered in yelp.yelpData. error: ', error);
    next(error);
  });
};





module.exports = Yelp;