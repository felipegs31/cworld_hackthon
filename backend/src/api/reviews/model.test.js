import { Reviews } from '.'
import { User } from '../user'
import { Restaurants } from '../restaurants'


let user, reviews, restaurant

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  restaurant = await Restaurants.create({ name: 'name_restaurant', category: 'category_restaurant', photoUrl: 'photourl' })
  reviews = await Reviews.create({ user, rate: 5, comment: 'test', visitDate: '12/12/2020', restaurant: restaurant.id })
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
    expect(view.restaurant).toBe(reviews.restaurant)
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
