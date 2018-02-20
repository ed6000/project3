const axios = require('axios');
const Goodreads = {};

Goodreads.queryBooks = (req, res, next) => {
  axios({
  method: "get",
  url:`https://www.googleapis.com/books/v1/volumes?q=moby+dick`,
})
  .then(response => {
    res.locals.book = response.data.GoodreadsResponse;
    console.log(process.env.GR_KEY);
    next();
  })
  .catch(error => {
    console.log('error encountered in goodreads.goodreadsData. error: ', error);
    next(error);
  });
};





module.exports = Goodreads;