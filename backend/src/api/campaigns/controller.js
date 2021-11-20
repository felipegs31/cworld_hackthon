import { success, notFound } from '../../services/response/'
import { Campaigns } from '.'
import { Rewards } from '../rewards'
import { fetchTwitter, detectSentiment } from './utils'
import { createReward } from '../rewards/controller'

export const create = ({ bodymen: { body } }, res, next) =>
  Campaigns.create(body)
    .then((campaigns) => campaigns.view(true))
    .then(success(res, 201))
    .catch(next)

export const analyze = ({ bodymen: { body }, params }, res, next) => {
  Campaigns.findById(params.id)
    .then(notFound(res))
    .then(async (campaign) => {
      const tweets = await fetchTwitter(campaign)
      const tweetsWithSentiment = await detectSentiment(tweets)
      for (const tweet of tweetsWithSentiment) {
        if (tweet.sentiment.SentimentScore.Positive >= (campaign.positivity / 100)) {
          createReward(campaign, tweet)
        }
      }
      return tweetsWithSentiment
    })
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Campaigns.count(Object.assign(query, { deleted: false }))
    .then(count => Campaigns.find(Object.assign(query, { deleted: false }), select, cursor)
      .then((campaigns) => ({
        count,
        rows: campaigns.map((campaigns) => campaigns.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Campaigns.findById(params.id)
    .then(notFound(res))
    .then((campaigns) => campaigns ? campaigns.view() : null)
    .then(success(res))
    .catch(next)

export const showRewards = ({ params, querymen: { query, select, cursor } }, res, next) => {
  Rewards.count(Object.assign(query, { deleted: false, campaign: params.id }))
    .then(count => Rewards.find(Object.assign(query, { deleted: false, campaign: params.id }), select, cursor)
      .then((rewards) => ({
        count,
        rows: rewards.map((rewards) => rewards.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Campaigns.findById(params.id)
    .then(notFound(res))
    .then((campaigns) => campaigns ? Object.assign(campaigns, body).save() : null)
    .then((campaigns) => campaigns ? campaigns.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Campaigns.findById(params.id)
    .then(notFound(res))
    .then((campaigns) => campaigns ? campaigns.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const soft_delete = ({ params }, res, next) =>
  Campaigns.findById(params.id)
    .then(notFound(res))
    .then((campaigns) => campaigns ? Object.assign(campaigns, { deleted: true }).save() : null)
    .then((campaigns) => campaigns ? campaigns.view(true) : null)
    .then(success(res))
    .catch(next)
