const axios = require('axios');
const Yelp = {};

Yelp.queryFiveRestaurants = (req, res, next) => {
  axios({
  method: "get",
  url:
    "http://api.yelp.com/v3/businesses/search?term=food&location===10002&limit=5",
  headers:{
    Authorization:
      `Bearer ${process.env.YELP_KEY}`
  }
})
  .then(response => {
    res.locals.yelpData = response.data.businesses;
    console.log(process.env.YELP_KEY);
    next();
  })
  .catch(error => {
    console.log('error encountered in yelp.yelpData. error: ', error);
    next(error);
  });
};





module.exports = Yelp;