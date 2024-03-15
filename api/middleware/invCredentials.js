const Users = require('../users/user-model.js');

const invCredentials = async function (req, res, next) {
  const { username } = req.body;
  const user = await Users.findBy(username);

  if (user.username.length === 0 && user.password.length === 0) {
    res.status(400).json({ message: 'username and password required' });
  } else {
    // req.user = user;
    next();
  }
}

module.exports = invCredentials;