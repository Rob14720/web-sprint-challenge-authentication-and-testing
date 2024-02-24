const { findBy } = require('../users/user-model');

const checkIfUsernameExists = async (req, res, next) => {
    try {
        const [user] = await findBy({ username: req.body.username });
        if (!user) {
        next();
        } else {
        next({ status: 400, message: 'username taken' });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = checkIfUsernameExists;
