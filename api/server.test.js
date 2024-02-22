// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')
const jwtDecode = require('jwt-decode')



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
  it('[2] responds with a 400 status code if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test' })
    expect(res.status).toBe(400)
  }
  )
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
