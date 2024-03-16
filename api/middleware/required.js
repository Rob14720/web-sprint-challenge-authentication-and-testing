
const required = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    if ( trimmedUsername.length === 0 || trimmedPassword.length === 0) {
      res.status(400).json({ message: 'username and password required' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = required