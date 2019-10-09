const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const authenticate = require('./utils/authenticate');

const keyGenerateRoutes = require('./routes/keyGenerate');

app.use('/', keyGenerateRoutes)

app.get('/', (req, res) => {
  res.json({'message': 'This is the leaderboard api. Go to /register to generate account'})
})


app.get('/api/:key/scores', authenticate, (req,res) => {
  res.send('howdy')
})


app.listen(PORT, function() {
  console.log('Scores are being served...');
})
