import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { index, rewards, showMe, show, create, update, updatePassword, destroy, soft_delete, update_addkeys } from './controller'
import { schema } from './model'
export User, { schema } from './model'

const router = new Router()
const { email, password, name, picture, role, twitterId, walletAddress } = schema.tree

router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

router.get('/me',
  token({ required: true }),
  showMe)

router.get('/rewards',
  token({ required: true }),
  query(),
  rewards)

router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

router.post('/',
  body({ email, password, name }),
  create)



router.put('/addkeys',
  token({ required: true }),
  body({ twitterId, walletAddress }),
  update_addkeys)

router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, role }),
  update)

router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

router.put('/:id/delete',
  token({ required: true, roles: ['admin'] }),
  soft_delete)

export default router
