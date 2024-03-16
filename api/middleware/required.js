
const required = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    if (username.length === 0 || password.length === 0) {
      res.status(400).json({ message: 'username and password required' });
    } else {
      req.user = { username, password };
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = required