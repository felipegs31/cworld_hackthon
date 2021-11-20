import { success, notFound } from '../../services/response/'
import { Rewards } from '.'

export const createReward = (campaign, tweet) => {
  Rewards.create({
    influencerTwitterId: tweet.author_id,
    key: `${campaign._id}|${tweet.author_id}`,
    campaign: campaign._id,
    positivity: tweet.sentiment.SentimentScore.Positive,
    tweetId: tweet.id,
    value: 0.1
  })
    .then(reward => console.log("reward created", reward))
    .catch(e => console.log("error create reward", e))
}

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
