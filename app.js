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
app.use(bodyParser.json());

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials'));
app.set('views','./views');
app.set('view engine', 'mustache');
app.use(express.static('public'))

const authenticate = require('./utils/authenticate');

const keyGenerateRoutes = require('./routes/keyGenerate');

app.use('/', keyGenerateRoutes);

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/api/:key/scores', authenticate, (req,res) => {
  res.send('howdy')
})

app.listen(PORT, function() {
  console.log('Scores are being served...');
})
