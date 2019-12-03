const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const bcrypt = require('bcrypt');
const m = require('mongoose');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const DATABASE_URL = process.env.DATABASE_URL

const User = require('../schemas/user');

const router = express.Router();

m.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if(!error) {
    console.log('Connected to MongoDB.')
  } else {
    console.log(error)
  }
})


router.post('/', (req,res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  // check to see if email has been registered before

  User.find({email}, (error, user) => {
    if(!error && user.length > 0) {
      res.json({ success: false, message: "It appears that this email is already registered, is that the case?", email: user.email });
    } else {

      // if new registration, encrypt confidential information and create new api key

      const email = req.body.email;
      const pass = bcrypt.hashSync(req.body.pass, SALT_ROUNDS);

      const uuidAPIKeyToken = uuidAPIKey.create();
      const { apiKey } = uuidAPIKeyToken;
      const key = bcrypt.hashSync(apiKey, SALT_ROUNDS)

      let user = new User({
        email,
        pass,
        key,
      })

      // add encrypted user and key to database

      user.save(error => {
        if(!error) {
          res.render('key', {apiKey})
        } else {
          res.json({ success: false, message: 'Unable to create user', error })
        }
      })
    }
  })
})

module.exports = router
