import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { index, show } from './controller'
import { schema } from './model'
export Rewards, { schema } from './model'

const router = new Router()

/**
 * @api {get} /restaurants Retrieve restaurants
 * @apiName RetrieveRestaurants
 * @apiGroup Restaurants
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of restaurants.
 * @apiSuccess {Object[]} rows List of restaurants.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /restaurants/:id Retrieve restaurants
 * @apiName RetrieveRestaurants
 * @apiGroup Restaurants
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} restaurants Restaurants's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Restaurants not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

export default router
