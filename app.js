const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mustacheExpress = require('mustache-express');
const path = require('path');
const m = require('mongoose');

require('dotenv').config();

const app = express();
const VIEWS_PATH = path.join(__dirname, '/views');

const DATABASE_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT || 8080;

m.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (error) => {
  if(!error) {
    console.log('Connected to MongoDB.');
  } else {
    console.log('Unable to connect to MongoDB; error:');
    console.log(error);
  }
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials'));
app.set('views','./views');
app.set('view engine', 'mustache');
app.use(express.static('public'))

const authenticate = require('./utils/authenticate');

const keyGenerateRoutes = require('./routes/keyGenerate');
const scoreRoutes = require('./routes/scoreRoutes');
const purgeRoutes = require('./routes/purgeRoutes')

app.use('/get-key', keyGenerateRoutes);
app.use('/:key/scores', authenticate, scoreRoutes);
app.use('/:key/purge', authenticate, purgeRoutes);

//basic routes for views

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/docs', (req,res) => {
  res.render('docs');
})

app.get('/register', (req, res) => {
  res.render('register');
})

// app.get('/api/:key/scores', authenticate, (req,res) => {
//   res.send('howdy')
// })
// test key:
// 7TS176K-D5NMXJ3-PZCNC70-736WRW4

app.listen(PORT, function() {
  console.log(`Scores are being served... on port ${PORT}`);
})
