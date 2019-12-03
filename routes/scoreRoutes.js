const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
  res.send('scores!')
})

router.post('/', (req,res) => {
  res.send('scores added!')
})

module.exports = router;
