const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const bcrypt = require('bcrypt');


const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const User = require('../schemas/user');

const router = express.Router();


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
      const key = bcrypt.hashSync(apiKey, SALT_ROUNDS);

      let user = new User({
        email,
        pass,
        key,
        scores: [],
      })

      // add encrypted user and key to database

      user.save(error => {
        if(!error) {
          res.render('key', {apiKey});
        } else {
          res.json({ success: false, message: 'Unable to create user', error });
        }
      })
    }
  })
})

module.exports = router
