import request from 'supertest'
import dotenv from 'dotenv'
import app from '../server'
import sequelize from '../models'

dotenv.config()

let token: string
let id: number

beforeAll(async () => {
  await sequelize.sync()
})

afterAll(async () => {
  await sequelize.close()
})

describe('POST /api/book', () => {
  // create an user because a token is needed
  // User.sync({ force: true })
  // Book.sync({ force: true })
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

  it('should login the user', async () => {
    // login the user and create the token
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

  it('should post a new book', async () => {
    await request(app)
      .post('/api/books')
      .send({
        book_id: 'The Name of the Wind',
        status: 'read',
        review: 'Its a good book',
        score: 5,
      })
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
        id = res.body.result.id
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw bad credentials error', async () => {
    await request(app)
      .post('/api/books')
      .send({
        book_id: 'The Name of the Wind',
        status: 'read',
        review: 'Its a good book',
        score: 5,
      })
      .expect(401)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw validation error', async () => {
    await request(app)
      .post('/api/books')
      .send({
        book_id: 'The Name of the Wind',
        status: 'readed', // should be "read"
        review: 'Its a good book',
        score: 5,
      })
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })
})

describe('GET /api/book', () => {
  it('should get books', async () => {
    await request(app)
      .get('/api/books')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should throw validation error', async () => {
    await request(app)
      .get('/api/books')
      .expect(401)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })
})

describe('PUT /api/book', () => {
  it('should put a book', async () => {
    await request(app)
      .put(`/api/books/${id}`)
      .send({
        book_id: 'The Name of the Wind',
        status: 'to-read',
        review: 'Its a very good book',
        score: 5,
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

  it('should throw validation error', async () => {
    await request(app)
      .put(`/api/books/${id}`)
      .send({
        book_id: 'The Name of the Wind',
        status: 'to-read',
        review: 'Its a very good book',
        score: 5,
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

describe('DELETE /api/books', () => {
  it('should throw bad credentials error', async () => {
    await request(app)
      .delete(`/api/books/${id}`)
      .expect(401)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', false)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should delete the book', async () => {
    await request(app)
      .delete(`/api/books/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .then(async (res) => {
        expect(res.body).toHaveProperty('ok', true)
      })
      .catch((err) => {
        throw err
      })
  })

  it('should delete the user', async () => {
    // delete the user that was being used
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
})
