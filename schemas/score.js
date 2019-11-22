const m = require('mongoose');


const scoreSchema = new m.Schema({
  value: Number,
  intials: String,
  userId: Number,
})

const Score = m.model('Score', scoreSchema)

module.exports = scoreSchema;
