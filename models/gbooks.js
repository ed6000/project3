const axios = require('axios');
const Gbooks = {};

Gbooks.queryBooks = (req, res, next) => {
  const keyword = req.body.keyword;
  console.log('in gbooks.queryBooks, keyword is ', keyword);
  axios({
  method: "get",
  url: `https://www.googleapis.com/books/v1/volumes?q=${keyword}`,
})
  .then(response => {
    res.locals.gbooks = response.data.items;
    console.log('response: ', response.data.items);
    next();
  })
  .catch(error => {
    console.log('error encountered in Gbooks error: ', error);
    next(error);
  });
};





module.exports = Gbooks;