const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restricted = require('./middleware/restricted.js');
const userExists = require('./middleware/unique-name.js');
const required = require('./middleware/required.js');


const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', userExists, required, authRouter);
server.use('/api/jokes', restricted, jokesRouter); // only logged-in users should have access!

server.get('/', (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
