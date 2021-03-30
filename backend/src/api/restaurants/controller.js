import { success, notFound } from '../../services/response/'
import { Restaurants } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Restaurants.create(body)
    .then((restaurants) => restaurants.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Restaurants.count(query)
    .then(count => Restaurants.find(query, select, cursor)
      .then((restaurants) => ({
        count,
        rows: restaurants.map((restaurants) => restaurants.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Restaurants.findById(params.id)
    .then(notFound(res))
    .then((restaurants) => restaurants ? restaurants.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Restaurants.findById(params.id)
    .then(notFound(res))
    .then((restaurants) => restaurants ? Object.assign(restaurants, body).save() : null)
    .then((restaurants) => restaurants ? restaurants.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Restaurants.findById(params.id)
    .then(notFound(res))
    .then((restaurants) => restaurants ? restaurants.remove() : null)
    .then(success(res, 204))
    .catch(next)
