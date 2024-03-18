
const required = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username ? username.trim() : '';
    const trimmedPassword = password ? password.trim() : '';
    if (!trimmedUsername || !trimmedPassword ) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    next(); 
  } catch (err) {
    next(err);
  }
}

module.exports = required;