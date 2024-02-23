const router = require('express').Router();
const { JWT_SECRET } = require('../secret')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model');
const restricted = require ('../middleware/restricted');

router.post('/register', (req, res, next) => {
  const { username, password } = req. body;

  const hash = bcrypt.hashSync(password, 8);

  if(!username || !password) {
    return res.status(400).json('username and password required')
  } else if (checkIfUsernameExists*username) {
    return res.status(400).json('username taken')
  } else {
    Users.add({ username, password: hash })
  .then(newUser => {
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      password: newUser.password
    })
  }) .catch(next)
  }
});


async function checkIfUsernameExists(username) {
if(username) {
  const exists = await Users.findBy({ username});
  return exists;
}
}

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
    

router.post('/login', restricted, (req, res) => {
  const { username, password } = req.body;
  const userExists = checkIfUsernameExists(username);
  const passwordCorrect = true;
  const token = jwt.sign({ username }, JWT_SECRET);
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json("username and password required");
  } else if (!userExists) {
    return res.status(200).json("invalid credentials");
  } else if (!passwordCorrect) {
    return res.status(400).json("invalid credentials");
  } else {
    res.status(200).json({
      message: `welcome, ${username}`,
      token
    });
  }

  // Check if the password is correct
  // Replace the following code with your logic to check if the password is correct
   // Replace with your logic

  // Generate a JWT token


  // Return the response with the new user's information and token
});
  
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
