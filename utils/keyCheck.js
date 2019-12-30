const bcrypt = require('bcrypt');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const userExistCheck = async (array, key) => {
  let user = null;

  for (let i = 0; i < array.length; i++) {
    let keyHash = array[i].key;
    const match = await bcrypt.compare(key, keyHash)
    if (match) {
      user = {id: array[i]._id, email: array[i].email, scores: array[i].scores};
      return user
    }
  }

  return user;
}


const keyCheck = async (key, users) => {
  const user = await userExistCheck(users, key);
  if(user) {
    return user;
  }
  return false;
}

module.exports = keyCheck;
