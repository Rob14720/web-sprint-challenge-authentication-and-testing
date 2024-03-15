const Users = require('../users/user-model');

const uniqueUser = async function (req, res, next) {
    try {
      const { username } = req.body;
    const user = await Users.findBy({ username: username });
  
    if (!user) {
      res.status(400).json({ message: 'username taken' });
    } else {
      req.user = user;
      next();
    }
    } catch (err) {
      next(err);
    }
  };

  module.exports = uniqueUser;
