import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { index, claimReward, show } from './controller'
import { schema } from './model'
export Rewards, { schema } from './model'

const router = new Router()


router.get('/',
  token({ required: true }),
  query(),
  index)

router.get('/:id',
  token({ required: true }),
  show)

router.post('/:id/claim',
  token({ required: true }),
  claimReward)

export default router
