const axios = require('axios');
const Gbooks = {};

Gbooks.queryBooks = (req, res, next) => {
  book = req.body.book;
  axios({
  method: "get",
  url: `https://www.googleapis.com/books/v1/volumes?q=${book}`,
})
  .then(response => {
    res.locals.Gbooks = response.data.items;
    console.log('response: ', response.data.Gbooks);
    next();
  })
  .catch(error => {
    console.log('error encountered in Gbooks error: ', error);
    next(error);
  });
};





module.exports = Gbooks;