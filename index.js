const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require('dotenv').config();


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

app.use(morgan('dev'));

app.use(cookieParser());

app.listen(port, () => {
  console.log('Server started on ' + port);
});

const usersRouter = require('./controllers/users.js');
const eventsRouter = require('./controllers/events.js');
const invitesRouter = require('./controllers/invites.js');
const yelpRouter = require('./controllers/yelp.js');

app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/invites', invitesRouter);
app.use('/addevent', yelpRouter);

app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});
