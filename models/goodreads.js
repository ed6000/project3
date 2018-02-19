const axios = require('axios');
const goodreads = {};

goodreads.queryBooks = (req, res, next) => {
  axios({
  method: "get",
  url:`https://www.goodreads.com/search.xml?key=${process.env.GR_KEY}&q={searchTerm}`,
  headers:{
    Authorization:
      `Bearer ${process.env.GR_KEY}`
  }
})
  .then(response => {
    res.locals.yelpData = response.data.businesses;
    console.log(process.env.GR_KEY);
    next();
  })
  .catch(error => {
    console.log('error encountered in yelp.yelpData. error: ', error);
    next(error);
  });
};





module.exports = goodreads;