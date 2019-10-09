const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const bcrypt = require('bcrypt');
const m = require('mongoose');

const User = require('../schemas/user');

const router = express.Router();

m.connect('mongodb+srv://jabberwocky:test123@cluster0-kokcg.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if(!error) {
    console.log('Connected to MongoDB.')
  } else {
    console.log(error)
  }
})

router.post('/add-user', (req,res) => {
  const email = req.body.email;
  const pass = bcrypt.hashSync(req.body.pass, 1);
  const uuidAPIKeyToken = uuidAPIKey.create();
  const { apiKey } = uuidAPIKeyToken;

  let user = new User({
    email,
    pass,
    key: apiKey
  })

  user.save(error => {
    if(!error) {
      res.json({success: true, message: 'get you a key', apiKey })
    } else {
      res.json({ success: false, message: 'Unable to create user', error })
    }
  })
})

// route below is to test if exists, it only returns where that email exists

router.post('/view-user', (req, res) => {
  email = req.body.email
  User.find({email}, (error, user) => {
    if(!error) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, error })
    }
  })
})

router.post('/get-key', (req,res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  // check to see if email has been registered before

  User.find({email}, (error, user) => {
    if(!error) {
      console.log(user);
    } else {
      console.log(error);
    }
  })

  // if not, create new api key and store it
  const uuidAPIKeyToken = uuidAPIKey.create();
  const { apiKey } = uuidAPIKeyToken;

  // add user to database




  //send results or errors
  res.json({message: 'get you a key', apiKey })
})

module.exports = router
