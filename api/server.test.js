// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})


test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /api/auth/register', () => {
  it('[1] responds with the new user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' })
    
      expect(res.body).toMatchObject({
        username: 'test',
        password: expect.any(String),
        id: expect.any(Number)
      })
  })


  it('[2] adds a new user with a bcrypted password to the users table on success', async () => {
    const req = await request(server)
    .post('/api/auth/register')
    .send({ username: 'meow', password: '1234' })
    expect(bcrypt.compareSync('1234', req.body.password)).toBeTruthy();
    expect(req.body).toMatchObject({
      password: expect.any(String),
      username: 'meow',
      id: expect.any(Number),
    })
  })

})


describe('[POST] /api/auth/login', () => {
  it('[3] responds with a 401 status code if the username does not exist', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test', password: 'test' })
    expect(res.status).toBe(401)
  })
  it('[4] responds with a 400 status code if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test' })
    expect(res.status).toBe(400)
  }
  )

})
