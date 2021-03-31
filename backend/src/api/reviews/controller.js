import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Reviews } from '.'
import { Restaurants} from './../restaurants'
import { isEmpty } from 'lodash'

// done with async/await to show other ways of doing this
export const create = async ({ user, bodymen: { body } }, res, next) => {
  try {
    const restaurant = await Restaurants.findOne({ _id: body.restaurant})
    if(!isEmpty(Restaurants)) {
      await Reviews.create({ ...body, user })
      const indexRate = body.rate
      const key = Object.keys(restaurant.rates)[indexRate]
      restaurant.rates[key] = restaurant.rates[key] + 1
      await restaurant.save()
      return res.status(201).json({
        success: true
      })
    } else {
      return res.status(409)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Reviews.count(query)
    .then(count => Reviews.find(query, select, cursor)
      .populate('user')
      .then((reviews) => ({
        count,
        rows: reviews.map((reviews) => reviews.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const index_restaurant = ({ querymen: { query, select, cursor }, params }, res, next) =>
  Reviews.count(Object.assign(query, {restaurant: params.id}))
    .then(count => Reviews.find(Object.assign(query, {restaurant: params.id}), select, cursor)
      .populate('user')
      .then((reviews) => ({
        count,
        rows: reviews.map((reviews) => reviews.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const restaurant_highest = ({ params }, res, next) => {
  console.log('restaurant_highest')
  Reviews.findOne(Object.assign({restaurant: params.id}))
    .sort({rate: -1, createdAt: -1})
    .populate('user')
    .then(notFound(res))
    .then((reviews) => reviews ? reviews.view() : null)
    .then(success(res))
    .catch(next)
}

export const restaurant_lowest = ({ params }, res, next) => {
  console.log('restaurant_lowest')
  Reviews.findOne(Object.assign({restaurant: params.id}))
    .sort({"rate": 1, "createdAt": -1})
    .populate('user')
    .then(notFound(res))
    .then((reviews) => reviews ? reviews.view() : null)
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Reviews.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((reviews) => reviews ? reviews.view() : null)
    .then(success(res))
    .catch(next)


export const update = async ({ user, bodymen: { body }, params }, res, next) => {
  try {
    const restaurant = await Restaurants.findOne({ _id: body.restaurant})
    if(!isEmpty(Restaurants)) {
      const review = await Reviews.findById(params.id).populate('user')
      const auth = await authorOrAdmin(res, user, 'user')(review)

      if(!isEmpty(review) && review !== null) {
        // remove star
        const indexRateRemove = review.rate
        const keyRemove = Object.keys(restaurant.rates)[indexRateRemove]
        restaurant.rates[keyRemove] = restaurant.rates[keyRemove] > 0 ? restaurant.rates[keyRemove] - 1 : 0

        // add start
        const indexRate = body.rate
        const key = Object.keys(restaurant.rates)[indexRate]
        restaurant.rates[key] = restaurant.rates[key] + 1

        const newReview = Object.assign(review, body)
        await newReview.save()

        await restaurant.save()
        return res.status(201).json({
          success: true
        })
      } else {
        return res.status(409)
      }
    } else {
      return res.status(409)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
}


export const destroy = ({ user, params }, res, next) =>
  Reviews.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((reviews) => reviews ? reviews.remove() : null)
    .then(success(res, 204))
    .catch(next)
