const m = require('mongoose');

const scoreSchema = new m.Schema({
  value: Number,
  initials: String,
})

const Score = m.model('Score', scoreSchema)

module.exports = scoreSchema;
