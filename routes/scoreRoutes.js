const express = require('express');
const router = express.Router();
const User = require('../schemas/user');


router.get('/', (req,res) => {
  console.log('in the scores route')
  console.log(res.locals.user)
  res.json(res.locals.user.scores)
})

router.post('/', (req,res) => {
  value = req.body.value;
  initials = req.body.initials;
  userId = res.locals.user.id
  const scores = res.locals.user.scores

  const score = {
    value,
    initials,
  }

  scores.push(score);

  User.findOneAndUpdate({_id: userId}, {scores}, (error) => {
      if(!error) {
        res.json({ success: true, value, initials})
      } else {
        console.log(error)
        res.json({ success: false, message: 'Unable to save scores', error })
      }
  })
})

module.exports = router;
