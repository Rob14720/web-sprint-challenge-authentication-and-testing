// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./secret/index')

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
    const res = await request(server)
    .post('/api/auth/register')
    .send({ username: 'meow', password: '1234' })
    expect(bcrypt.compareSync('1234', res.body.password)).toBeTruthy();
    expect(res.body).toMatchObject({
      username: 'meow',
      id: expect.any(Number),
    })
  })


  it('[3] responds with a message if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test' })
    expect(res.body.message).toMatch(/username and password required/i)
  })
  it('[4] responds with a message if the username is taken', async () => {
   const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' })
    expect(res.body.message).toMatch(/username taken/i)
  })
})


describe('[POST] /api/auth/login', () => {
  it('[5] responds with a 200 status code if the user is logged in', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test', password: 'test' })
    expect(res.status).toBe(200)
  }
  )
  it('[6] responds with a 400 status code if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test' })
    expect(res.status).toBe(400)
  }
  )

  it('[7] log in the user and respond with a welcome message and a token', async () => {
    await request(server).post('/api/auth/login').send({ username: 'test', password: 'test' })
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test', password: 'test' })
    const token = res.body.token
    const decoded = jwt.verify(token, JWT_SECRET)
    expect(res.body.message).toMatch(/welcome, test/i)
    expect(decoded).toMatchObject({ username: 'test', iat: expect.any(Number) })
  })

})
