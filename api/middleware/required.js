
const required = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    if (trimmedUsername.length === 0 || trimmedPassword.length === 0) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    next(); 
  } catch (err) {
    next(err);
  }
}

module.exports = required