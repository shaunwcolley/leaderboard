const m = require('mongoose');
const scoreSchema = require('./score')

const userSchema = new m.Schema({
  email: String,
  pass: String,
  key: String,
  scores: [scoreSchema],
})

const User = m.model('User', userSchema)

module.exports = User;
