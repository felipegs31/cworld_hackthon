import request from 'supertest'
import nock from 'nock'
import express from '../../services/express'
import { masterKey, apiRoot } from '../../config'
import { User } from '../user'
import routes, { InviteUser } from '.'
import { signSync } from '../../services/jwt'

const app = () => express(apiRoot, routes)

let inviteUser, adminSession

beforeEach(async () => {
  nock('https://api.sendgrid.com').post('/v3/mail/send').reply(202)
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  adminSession = signSync(admin.id)

  inviteUser = await InviteUser.create({ email: 'a@a.com', role: 'any_role', name: 'any_name' })
})

afterEach(() => {
  nock.restore()
})

test('POST /invite-user 400 (master) - invalid email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: adminSession, email: 'invalid', link: 'http://example.com' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('email')
})

test('POST /invite-user 400 (master) - missing email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: adminSession, link: 'http://example.com' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('email')
})


test('POST /invite-user 401', async () => {
  const { status } = await request(app())
    .post(apiRoot)
    .send({ email: 'a@a.com', link: 'http://example.com' })
  expect(status).toBe(401)
})

test('GET /invite-user/:token 404', async () => {
  const { status } = await request(app()).get(apiRoot + '/123')
  expect(status).toBe(404)
})
