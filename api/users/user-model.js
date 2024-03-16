const db = require('../../data/dbConfig')

function find() {
    return db('users')
}

function findBy(filter) {
     return db('users').where(filter).first()
}

async function add({username, password}) {
    const [id] = await db('users').insert({username, password});
    const newUser = await findById(id);
    return newUser;
}

async function findById(id) {
    return db('users as u')
        .select('u.id', 'u.username')
        .where({ id }).first()
}

module.exports = {
    find,
    findBy,
    add,
    findById,
}