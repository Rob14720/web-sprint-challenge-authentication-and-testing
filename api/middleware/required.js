
const required = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
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