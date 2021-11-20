import { success, notFound } from '../../services/response/'
import { Rewards } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Rewards.create(body)
    .then((campaigns) => campaigns.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Rewards.count(Object.assign(query, { deleted: false }))
    .then(count => Rewards.find(Object.assign(query, { deleted: false }), select, cursor)
      .then((campaigns) => ({
        count,
        rows: campaigns.map((campaigns) => campaigns.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Rewards.findById(params.id)
    .then(notFound(res))
    .then((campaigns) => campaigns ? campaigns.view() : null)
    .then(success(res))
    .catch(next)
