import { success, notFound } from '../../services/response/'
import { Campaigns } from '.'
import { fetchTwitter, detectSentiment } from './utils'

export const create = ({ user ,bodymen: { body } }, res, next) => {
  Campaigns.create({...body, createdBy: user.id })
    .then((campaigns) => campaigns.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const analyze = ({ bodymen: { body }, params }, res, next) => {
  Campaigns.findById(params.id)
    .then(notFound(res))
    .then(async (campaign) => {
      const tweets = await fetchTwitter(campaign)
      const tweetsWithSentiment = await detectSentiment(tweets)
      return tweetsWithSentiment
    })
    .then(success(res))
    .catch(next)
}

export const index = ({ user, querymen: { query, select, cursor } }, res, next) =>
  Campaigns.count(Object.assign(query, { deleted: false, createdBy: user.id }))
    .then(count => Campaigns.find(Object.assign(query, { deleted: false, createdBy: user.id }), select, cursor)
      .then((campaigns) => ({
        count,
        rows: campaigns.map((campaigns) => campaigns.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ user, params }, res, next) =>
  Campaigns.findOne({_id: params.id, createdBy: user.id})
    .then(notFound(res))
    .then((campaigns) => campaigns ? campaigns.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Campaigns.findOne({_id: params.id, createdBy: user.id})
    .then(notFound(res))
    .then((campaigns) => campaigns ? Object.assign(campaigns, body).save() : null)
    .then((campaigns) => campaigns ? campaigns.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Campaigns.findOne({_id: params.id, createdBy: user.id})
    .then(notFound(res))
    .then((campaigns) => campaigns ? campaigns.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const soft_delete = ({ params }, res, next) =>
  Campaigns.findOne({_id: params.id, createdBy: user.id})
    .then(notFound(res))
    .then((campaigns) => campaigns ? Object.assign(campaigns, { deleted: true }).save() : null)
    .then((campaigns) => campaigns ? campaigns.view(true) : null)
    .then(success(res))
    .catch(next)
