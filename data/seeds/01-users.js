exports.seed = async function(knex) {
    await knex('users').truncate()
    await knex('users').insert([
        { username: 'admin', password: 'password' },
        { username: 'user', password: 'password' },
        { username: 'user2', password: 'password' },
    ])
}