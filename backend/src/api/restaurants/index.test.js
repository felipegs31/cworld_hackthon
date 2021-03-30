import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Restaurants } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, restaurants

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  restaurants = await Restaurants.create({})
})

test('POST /restaurants 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', photoUrl: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.photoUrl).toEqual('test')
  expect(body.category).toEqual('test')
})

test('POST /restaurants 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /restaurants 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /restaurants 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /restaurants 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /restaurants/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${restaurants.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(restaurants.id)
})

test('GET /restaurants/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${restaurants.id}`)
  expect(status).toBe(401)
})

test('GET /restaurants/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /restaurants/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${restaurants.id}`)
    .send({ access_token: adminSession, name: 'test', photoUrl: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(restaurants.id)
  expect(body.name).toEqual('test')
  expect(body.photoUrl).toEqual('test')
  expect(body.category).toEqual('test')
})

test('PUT /restaurants/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${restaurants.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /restaurants/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${restaurants.id}`)
  expect(status).toBe(401)
})

test('PUT /restaurants/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', photoUrl: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /restaurants/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${restaurants.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /restaurants/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${restaurants.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /restaurants/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${restaurants.id}`)
  expect(status).toBe(401)
})

test('DELETE /restaurants/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
