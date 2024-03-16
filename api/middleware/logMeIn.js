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
      const user = await User.findBy({ username : req.body.username})
      if (!user) {
        next({ status: 401, message: 'Invalid credentials' })
      } else {
        next()
      }
    } catch (err) {
      next(err)
    }
  }

  module.exports = checkUsernameExists;