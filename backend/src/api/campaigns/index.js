import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, soft_delete, showRewards, analyze } from './controller'
import { schema } from './model'
export Campaigns, { schema } from './model'

const router = new Router()
const { name, photoUrl, budget, startDate, endDate, ageRange, filterTags, goals, queryText, positivity } = schema.tree

router.post('/',
  token({ required: true }),
  body({ name, photoUrl, budget, startDate, endDate, ageRange, filterTags, goals, queryText, positivity }),
  create)

router.get('/',
  token({ required: true }),
  query(),
  index)


router.post('/:id/analyze',
  body({}),
  analyze)

router.get('/:id/rewards',
  token({ required: true }),
  query(),
  showRewards)

router.get('/:id',
  token({ required: true }),
  show)

router.put('/:id',
  token({ required: true }),
  body({ name, photoUrl, budget, startDate, endDate, ageRange, filterTags, goals, queryText, positivity }),
  update)

router.delete('/:id',
  token({ required: true }),
  destroy)

router.put('/:id/delete',
  token({ required: true }),
  soft_delete)

export default router
