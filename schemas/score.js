const m = require('mongoose');

const scoreSchema = new m.Schema({
  value: Integer,
  intials: String,
  userId: Integer,
})

const Score = m.model('Score', scoreSchema)

module.exports = Score;
