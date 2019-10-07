const m = require('mongoose');

const userSchema = new m.Schema({
  email: String,
  key: String,
})

const User = m.model('User', userSchema)

module.exports = User;
