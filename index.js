const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public/build'));

app.use(cors());
const tokenService = require('./services/TokenService');
const authService = require('./services/AuthService');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cookieParser());

app.listen(port, () => {
  console.log('Server started on ' + port);
});

const usersRouter = require('./controllers/users.js');
const eventsRouter = require('./controllers/events.js');
const invitesRouter = require('./controllers/invites.js');

app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/invites', invitesRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
});

app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});
