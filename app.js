const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mustacheExpress = require('mustache-express');
const path = require('path');

require('dotenv').config();

const app = express();
const VIEWS_PATH = path.join(__dirname, '/views');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials'));
app.set('views','./views');
app.set('view engine', 'mustache');
app.use(express.static('public'))

const authenticate = require('./utils/authenticate');

const keyGenerateRoutes = require('./routes/keyGenerate');
const scoreRoutes = require('./routes/scoreRoutes');

app.use('/get-key', keyGenerateRoutes);
app.use('/:key/scores', scoreRoutes);

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/register', (req, res) => {
  res.render('register')
})

// app.get('/api/:key/scores', authenticate, (req,res) => {
//   res.send('howdy')
// })
// test key:
// 7TS176K-D5NMXJ3-PZCNC70-736WRW4

app.listen(PORT, function() {
  console.log(`Scores are being served... on port ${PORT}`);
})
