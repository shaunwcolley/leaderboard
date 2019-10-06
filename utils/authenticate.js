// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');

//replace this with database users

const users = [
  {
    email: 'steve@steve.com',
    key: 'abc123',
    id: 0,
  },
  {
    email: 'lisa@steve.com',
    key: 'def456',
    id: 2,
  },
  {
    email: 'bill@steve.com',
    key: 'ghi789',
    id: 3,
  },
]

let keys = []

for (user of users) {
  keys.push(user.key)
}

// replace the above with database interaction

function authenticate(req, res, next) {
  if(req.params.key) {
    const key = req.params.key
    if(keys.includes(key)) {
      next();
    } else {
      res.status(401).json({message: 'Invalid API key, please double check or ask for a new key'})
    }
  } else {
    // log error because key is not being sent
    res.status(401).json({message: 'API key was not detected by server.'})
  }
}

module.exports = authenticate
