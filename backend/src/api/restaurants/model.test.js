import { Restaurants } from '.'

let restaurants

beforeEach(async () => {
  restaurants = await Restaurants.create({ name: 'test', averageRate: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = restaurants.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(restaurants.id)
    expect(view.name).toBe(restaurants.name)
    expect(view.averageRate).toBe(restaurants.averageRate)
    expect(view.category).toBe(restaurants.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = restaurants.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(restaurants.id)
    expect(view.name).toBe(restaurants.name)
    expect(view.averageRate).toBe(restaurants.averageRate)
    expect(view.category).toBe(restaurants.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
