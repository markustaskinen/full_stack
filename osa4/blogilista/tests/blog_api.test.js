const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('tests with initial notes', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    console.log('entered tests')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id is named id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)

    for (const id of ids) {
      expect(id).toBeDefined()
    }
  })
})

describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('adding a new note', () => {
  test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Hydrofeminism in the modern society',
      author: 'Iida Saaristomaa',
      url: 'www.hydro-communism.com',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsUpdated = await helper.blogsInDb()
    const titles = blogsUpdated.map(blog => blog.title)

    expect(blogsUpdated).toHaveLength(blogsAtStart.length + 1)
    expect(titles).toContain(
      'Hydrofeminism in the modern society'
    )
  })

  test('likes are set to 0 if likes are not given', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Hydrofeminism in the modern society',
      author: 'Iida Saaristomaa',
      url: 'www.hydro-communism.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsUpdated = await helper.blogsInDb()
    expect(blogsUpdated).toHaveLength(blogsAtStart.length + 1)
    expect(blogsUpdated[blogsUpdated.length - 1].likes).toBe(0)
  })

  test('400 if bad title and url missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'Martti Ahtisaari',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsUpdated = await helper.blogsInDb()
    expect(blogsUpdated).toHaveLength(blogsAtStart.length)

  })
})

describe('deletion of a blog', () => {
  test('success 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('success 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 99 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(updatedBlog.likes).toBe(99)
  })
})

afterAll(() => {
  mongoose.connection.close()
})