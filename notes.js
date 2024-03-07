const { username } = req.body;
  const user = await User.getByUsername(username);

  if (!user) {
    res.status(400).json({ message: 'invalid credentials' });
  } else {
    req.user = user;
    next();
  }
const User = require('../user/user-model.js');

module.exports = async function (req, res, next) {
  const { username } = req.body;
  const user = await User.getByUsername(username);

  if (!user) {
    res.status(400).json({ message: 'invalid credentials' });
  } else {
    req.user = user;
    next();
  }
}
//Validate-credentials
module.exports = function (req, res, next) {
  if (
    !req.body.username ||
    !req.body.password ||
    (typeof req.body.username !== 'string') ||
    (typeof req.body.password !== 'string') ||
    (req.body.username.length < 2) ||
    (req.body.password.length < 2)
  ) {
    res.status(400).json({ message: 'username and password required' });
  } else {
    next();
  }
}
//Unique-username
const User = require('../user/user-model.js');

module.exports = async function (req, res, next) {
  const { username } = req.body;
  const user = await User.getByUsername(username);

  if (user) {
    res.status(400).json({ message: 'username taken' });
  } else {
    next();
  }
}
//restricted
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'the secret';

module.exports = (req, res, next) => {
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'token required' });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'token invalid' });
    } else {
      req.token = decoded;
      next();
    }
  });
};

RitaA 2:45 PM
//usename-exists
const User = require('../user/user-model.js');

module.exports = async function (req, res, next) {
  const { username } = req.body;
  const user = await User.getByUsername(username);

  if (!user) {
    res.status(400).json({ message: 'invalid credentials' });
  } else {
    req.user = user;
    next();
  }
}