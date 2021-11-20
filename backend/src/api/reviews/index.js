import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, index_restaurant, restaurant_highest, restaurant_lowest } from './controller'
import { schema } from './model'
export Reviews, { schema } from './model'

const router = new Router()
const { rate, comment, restaurant, visitDate } = schema.tree

/**
 * @api {post} /reviews Create reviews
 * @apiName CreateReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rate Reviews's rate.
 * @apiParam comment Reviews's comment.
 * @apiParam restaurant Reviews's restaurant.
 * @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reviews not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ rate, comment, restaurant, visitDate }),
  create)

/**
 * @api {get} /reviews Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of reviews.
 * @apiSuccess {Object[]} rows List of reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)


/**
 * @api {get} /reviews/restaurant/:id Retrieve reviews for a particular Restaurant
 * @apiName RetrieveReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of reviews.
 * @apiSuccess {Object[]} rows List of reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
 router.get('/restaurant/:id',
 token({ required: true }),
 query(),
 index_restaurant)

 /**
 * @api {get} /reviews/restaurant/:id/highest Retrieve the highest review for a particular Restaurant
 * @apiName RetrieveReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
* @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
  router.get('/restaurant/:id/highest',
  token({ required: true }),
  restaurant_highest)


/**
 * @api {get} /reviews/restaurant/:id/lowest Retrieve the lowest review for a particular Restaurant
 * @apiName RetrieveReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
* @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/restaurant/:id/lowest',
token({ required: true }),
restaurant_lowest)


/**
 * @api {get} /reviews/:id Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reviews not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /reviews/:id Update reviews
 * @apiName UpdateReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rate Reviews's rate.
 * @apiParam comment Reviews's comment.
 * @apiParam restaurant Reviews's restaurant.
 * @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reviews not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ rate, comment, restaurant, visitDate }),
  update)

/**
 * @api {delete} /reviews/:id Delete reviews
 * @apiName DeleteReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reviews not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
