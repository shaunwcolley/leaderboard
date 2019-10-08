const express = require('express');
const uuidAPIKey = require('uuid-apikey')
const bcrypt = require('bcrypt');
const m = require('mongoose')

const router = express.Router();

router.get('/get-key', (req,res) => {
  const uuidAPIKeyToken = uuidAPIKey.create();
  const { apiKey } = uuidAPIKeyToken;

  // check to see if email has been registered before

  // register email if not

  // encrypt key and store it


  //send results or errors
  res.json({message: 'get you a key', apiKey })
})

module.exports = router
