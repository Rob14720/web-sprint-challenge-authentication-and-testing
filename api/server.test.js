// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')
const jwtDecode = require('jwt-decode')

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
    })
  })
  
  it('[2] adds a new user with a bcrypted password to the users table on success', async () => {
    await request(server).post('/api/auth/register').send({ username: 'meow', password: '1234' })
    const meow = await db('users').where('username', 'meow').first()
    expect(bcrypt.compareSync('1234', meow.password)).toBeTruthy()
  })
  })


describe('[POST] /api/auth/login', () => {
  it('[3] responds with a 200 status code if the user is logged in', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test', password: 'test' })
    expect(res.status).toBe(200)
  }
  )
  it('[4] responds with a 400 status code if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test' })
    expect(res.status).toBe(400)
  }
  )
 
})
