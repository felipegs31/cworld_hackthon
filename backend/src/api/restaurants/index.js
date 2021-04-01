import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, soft_delete } from './controller'
import { schema } from './model'
export Restaurants, { schema } from './model'

const router = new Router()
const { name, category, photoUrl } = schema.tree

/**
 * @api {post} /restaurants Create restaurants
 * @apiName CreateRestaurants
 * @apiGroup Restaurants
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Restaurants's name.
 * @apiParam category Restaurants's category.
 * @apiParam photoUrl Restaurants's photoUrl.
 * @apiSuccess {Object} restaurants Restaurants's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Restaurants not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, category, photoUrl }),
  create)

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

/**
 * @api {put} /restaurants/:id Update restaurants
 * @apiName UpdateRestaurants
 * @apiGroup Restaurants
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Restaurants's name.
 * @apiParam category Restaurants's category.
 * @apiParam photoUrl Restaurants's photoUrl.
 * @apiSuccess {Object} restaurants Restaurants's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Restaurants not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, category, photoUrl }),
  update)

/**
 * @api {delete} /restaurants/:id Delete restaurants
 * @apiName DeleteRestaurants
 * @apiGroup Restaurants
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Restaurants not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)


/**
 * @api {put} /restaurants/:id/delete SoftDelete restaurant
 * @apiName SoftDelete
 * @apiGroup Restaurant
 * @apiPermission restaurant
 * @apiParam {String} access_token Restaurant access_token.
 * @apiSuccess {Object} restaurant Restaurant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current restaurant or admin access only.
 * @apiError 404 Restaurant not found.
 */
router.put('/:id/delete',
  token({ required: true, roles: ['admin'] }),
  soft_delete)

export default router
