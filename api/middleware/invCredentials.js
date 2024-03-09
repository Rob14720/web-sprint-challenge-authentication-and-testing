const Users = require('../users/user-model.js');

module.exports = async function (req, res, next) {
  const { username } = req.body;
  const user = await Users.findBy(username);

  if (!user) {
    res.status(400).json({ message: 'invalid credentials' });
  } else {
    req.user = user;
    next();
  }
}