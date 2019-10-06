const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());


app.get('/api/:key/scores', (req,res) => {
  res.send('howdy')
})


app.listen(PORT, function() {
  console.log('Scores are being served...');
})
