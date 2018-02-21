const axios = require("axios");
const Ticket = {};

Ticket.queryFiveEvents = (req, res, next) => {
  city = req.body.city;
  axios({
    method: "get",
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${
      process.env.TICKET_KEY
    }&size=5&city=${city}`
  })
    .then(response => {
      res.locals.ticketData = response.data._embedded.events;
      console.log(process.env.TICKET_KEY);
      next();
    })
    .catch(error => {
      console.log("error encountered in res.locals.ticketData. error: ", error);
      next(error);
    });
};

module.exports = Ticket;




