const User = require('../schemas/user');
const query = User.find();

const keyCheck = require('./keyCheck');

const authenticate = async (req, res, next) => {
  if(req.params.key) {
    const key = req.params.key;
    let users = await query.exec()
    const user = await keyCheck(key, users);
    if(user) {
      res.locals.user = user
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
