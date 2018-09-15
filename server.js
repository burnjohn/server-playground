const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const findUser = require('./app/routes/find-user');
const auth = require('./app/routes/auth');
const verifyToken = require('./app/modules/check-token');

const app = express();

const port = process.env.PORT || 8080;

mongoose.connect(config.database, { useNewUrlParser: true });

app
  .set('superSecret', config.secret)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(morgan('dev'));

const apiRoutes = express.Router();

apiRoutes
  .use(verifyToken)
  .get('/', (req, res) => {
    res.send({ message: 'Welcome to the coolest API on earth!' });
  })
  .get('/users', findUser)
  .post('/authenticate', auth);

app.use('/api', apiRoutes);


app.listen(port);
console.log('Magic happens at http://localhost:' + port);

global.app = app;

