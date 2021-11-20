import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, show, update } from './controller'
import { schema } from '../user'
export InviteUser, { schema } from './model'

const router = new Router()
const { email, role, name } = schema.tree

/**
 * @api {post} /invite-user Send email
 * @apiName InviteUser
 * @apiGroup InviteUser
 * @apiPermission master
 * @apiParam {String} email Email address to receive the password reset token.
 * @apiParam {String} link Link to redirect user.
 * @apiSuccess (Success 202) 202 Accepted.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ email, role, name}),
  create)

/**
 * @api {get} /invite-user/:token Verify token
 * @apiName VerifyInviteUser
 * @apiGroup InviteUser
 * @apiSuccess {String} token Password reset token.
 * @apiSuccess {Object} user User's data.
 * @apiError 404 Token has expired or doesn't exist.
 */
router.get('/:token',
  show)

/**
 * @api {put} /invite-user/:token Submit password
 * @apiName SubmitInviteUser
 * @apiGroup InviteUser
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Token has expired or doesn't exist.
 */
router.put('/:token',
  body({ password:{
    type: String,
    required: true
  }}),
  update)

export default router
