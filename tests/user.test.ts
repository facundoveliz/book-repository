import request from 'supertest'
import dotenv from 'dotenv'
import app from '../server'
import sequelize from '../models'

dotenv.config()

let token: string

beforeAll(async () => {
  await sequelize.sync()
})

afterAll(async () => {
  await sequelize.close()
})

describe('POST /api/users/register', () => {
  // User.sync({ force: true })
  it('should register a new user', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'johndoepassword',
      })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw invalid email error because is already registered', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'johndoepassword',
      })
      .expect(400)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw validation error', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'John Doe',
        email: '',
        password: 'johndoepassword',
      })
      .expect(400)
      .then(async (res) => expect(res.body).toHaveProperty('ok', false))
      .catch((err) => {
        throw err
      })
  })
})

describe('POST /api/users/login', () => {
  it('should login the user', async () => {
    await request(app)
      .post('/api/users/login')
      .send({
        email: 'johndoe@gmail.com',
        password: 'johndoepassword',
      })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
        token = res.body.result
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw bad credentials error', async () => {
    await request(app)
      .post('/api/users/login')
      .send({
        email: 'johndoe@gmail.com',
        password: 'johnDoeWrongPassword',
      })
      .expect(400)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })
})

describe('GET /api/user', () => {
  it('should get current user info', async () => {
    await request(app)
      .get('/api/users')
      .expect(200)
      .set({ Authorization: `Bearer ${token}` })
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw error if the jwt token is wrong', async () => {
    await request(app)
      .get('/api/users')
      .expect(401)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })
})

describe('PUT /api/users', () => {
  it('should edit the user', async () => {
    await request(app)
      .put('/api/users')
      .send({
        username: 'Jon',
        email: 'Jondoe@gmail.com',
        password: 'Jondoepassword',
      })
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw bad credentials error', async () => {
    await request(app)
      .put('/api/users')
      .send({
        username: 'Jon',
        email: 'Jondoe@gmail.com',
        password: 'Jondoepassword',
      })
      .expect(401)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })
})

describe('DELETE /api/users', () => {
  it('should delete the user', async () => {
    await request(app)
      .delete('/api/users')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw bad credentials error', async () => {
    await request(app)
      .delete('/api/users')
      .expect(401)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })
})
