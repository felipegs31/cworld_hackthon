import { Reviews } from '.'
import { User } from '../user'

let user, reviews

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  reviews = await Reviews.create({ user, rate: 'test', comment: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reviews.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reviews.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rate).toBe(reviews.rate)
    expect(view.comment).toBe(reviews.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reviews.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reviews.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rate).toBe(reviews.rate)
    expect(view.comment).toBe(reviews.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
