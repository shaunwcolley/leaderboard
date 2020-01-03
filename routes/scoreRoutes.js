const express = require('express');
const router = express.Router();
const User = require('../schemas/user');


router.get('/', (req,res) => {
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

  let update = false;

  if (scores.length < 10) {
    update = true;
    scores.push(score);

    // ensure that scores are sorted descending;
    scores.sort((a, b) => (a.value < b.value) ? 1 : -1);

  } else {
    for (let i = 0; i < scores.length; i++) {
      if (value > scores[i].value) {
        update = true;
        break;
      }
    }
    if (update) {
      // push in new score since update === true
      scores.push(score);

      //sort scores
      scores.sort((a, b) => (a.value < b.value) ? 1 : -1)

      //remove lowest score
      scores.pop()

    }
  }

  if (update) {
    User.findOneAndUpdate({_id: userId}, {scores}, (error) => {
        if(!error) {
          res.json({ success: true, value, initials})
        } else {
          console.log(`error in updating scores in db: ${error}`)
          res.json({ success: false, message: 'Unable to save scores', error })
        }
    })
  } else {
    res.json({ success: false, message: 'not in top 10 scores...'})
  }

})

module.exports = router;
