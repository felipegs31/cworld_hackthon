import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Reviews } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Reviews.create({ ...body, user })
    .then((reviews) => reviews.view(true))
    .then(success(res, 201))
    .catch(next)

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

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Reviews.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((reviews) => reviews ? Object.assign(reviews, body).save() : null)
    .then((reviews) => reviews ? reviews.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Reviews.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((reviews) => reviews ? reviews.remove() : null)
    .then(success(res, 204))
    .catch(next)
