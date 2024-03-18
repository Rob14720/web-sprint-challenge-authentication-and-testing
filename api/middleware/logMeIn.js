const User = require('../users/user-model')

const checkUsernameExists = async (req, res, next) => {
    /*
      If the username in req.body does NOT exist in the database
      status 401
      {
        "message": "Invalid credentials"
      }
    */
    try {
      const { username } = req.body
      const user = await User.findBy({ username });

      if (!user) {
        return res.status(401).json({ message: 'invalid credentials' })
      } 
      
      req.user = user
      next();
    } catch (err) {
      next(err)
    }
  }

  module.exports = checkUsernameExists;