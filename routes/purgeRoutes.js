const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

router.delete('/', (req,res) => {
  const userId = res.locals.user.id
  const scores = [];
  User.findOneAndUpdate({_id: userId}, {scores}, (error) => {
    if (!error) {
      res.json({ success: true, message: "Scores deleted."})
    } else {
      res.json({success: false, message: "Failed to delete scores."})
    }
  })
})

module.exports = router;
