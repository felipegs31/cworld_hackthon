import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import { Restaurant } from '../restaurants'

import routes, { Reviews } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, reviews

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const restaurant = await Restaurant.create({ email: 'b@b.com', password: '123456' })

  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  reviews = await Reviews.create({ user })
})

test('POST /reviews 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, rate: 'test', comment: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.rate).toEqual('test')
  expect(body.comment).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /reviews 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reviews 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /reviews 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reviews/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reviews.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reviews.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /reviews/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(401)
})

test('GET /reviews/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /reviews/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reviews.id}`)
    .send({ access_token: userSession, rate: 'test', comment: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reviews.id)
  expect(body.rate).toEqual('test')
  expect(body.comment).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /reviews/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reviews.id}`)
    .send({ access_token: anotherSession, rate: 'test', comment: 'test' })
  expect(status).toBe(401)
})

test('PUT /reviews/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(401)
})

test('PUT /reviews/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, rate: 'test', comment: 'test' })
  expect(status).toBe(404)
})

test('DELETE /reviews/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reviews.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /reviews/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reviews.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /reviews/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(401)
})

test('DELETE /reviews/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
