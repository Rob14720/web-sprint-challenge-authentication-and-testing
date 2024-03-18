const router = require('express').Router();
const { JWT_SECRET } = require('../secret')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/user-model');
const uniqueUser = require('../middleware/unique-name');
const checkUsernameExists = require('../middleware/logMeIn');
const required = require('../middleware/required');



const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
};


router.post('/register', required, uniqueUser, async (req, res, next) => {
  //   const { username, password } = req.body;
  //   const hash = bcrypt.hashSync(password, 8);
  //   const newUser = await User.add({ username, password: hash });
  //   res.status(201).json(newUser);
  // });
  try {
    
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);
    const newUser = await User.add({
      username,
      password: hash
    });
    
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      password: hash
    
    });
  } catch (err) {
    next(err);
  }
});





/*
  IMPLEMENT
  You are welcome to build additional middlewares to help with the endpoint's functionality.
  DO NOT EXCEED 2^8 ROUNDS OF HASHING!

  1- In order to register a new account the client must provide `username` and `password`:
    {
      "username": "Captain Marvel", // must not exist already in the `users` table
      "password": "foobar"          // needs to be hashed before it's saved
    }

  2- On SUCCESSFUL registration,
    the response body should have `id`, `username` and `password`:
    {
      "id": 1,
      "username": "Captain Marvel",
      "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
    }

  3- On FAILED registration due to `username` or `password` missing from the request body,
    the response body should include a string exactly as follows: "username and password required".

  4- On FAILED registration due to the `username` being taken,
    the response body should include a string exactly as follows: "username taken".
*/


router.post('/login', required, checkUsernameExists, async (req, res, next) => {
  const { username } = req.body;
  const user = req.user;

  try {
    const passwordValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ message: 'invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: `welcome, ${username}!`, token });
  } catch (err) {
    next(err);
  }
});

  // Check if the password is correct
  // Replace the following code with your logic to check if the password is correct
  // Replace with your logic

  // Generate a JWT token


  // Return the response with the new user's information and token


/*
  IMPLEMENT
  You are welcome to build additional middlewares to help with the endpoint's functionality.

  1- In order to log into an existing account the client must provide `username` and `password`:
    {
      "username": "Captain Marvel",
      "password": "foobar"
    }

  2- On SUCCESSFUL login,
    the response body should have `message` and `token`:
    {
      "message": "welcome, Captain Marvel",
      "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
    }

  3- On FAILED login due to `username` or `password` missing from the request body,
    the response body should include a string exactly as follows: "username and password required".

  4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
    the response body should include a string exactly as follows: "invalid credentials".
*/

module.exports = router;
