import { success, notFound } from '../../services/response/'
import { Rewards } from '.'
import twit from 'twit'

export const publishTweet = async (message) => {
  const publishBot = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
  })

  var postTweet = message
  publishBot.post(
    'statuses/update',
    { status: postTweet },
    function (err, data, response) {
      if (err) {
        console.log("ERRO: " + err)
        return false
      }
      console.log("Tweet postado com sucesso!\n");
    }
  )
}

export const createReward = (campaign, tweet) => {
  Rewards.create({
    influencerTwitterId: tweet.author_id,
    key: `${campaign._id}|${tweet.author_id}`,
    campaign: campaign._id,
    positivity: tweet.sentiment.SentimentScore.Positive,
    tweetId: tweet.id,
    value: 0.1
  })
    .then(reward => {
      console.log("reward created", reward)
      publishTweet(`${tweet.name}, you have been rewarded for your content 🤑! Go to CWorld to claim your cUSD!`)
    })
    .catch(e => {
      // console.log("error create reward", e)
    })
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

export const claimReward = ({ params, user }, res, next) =>
  Rewards.findOne({ _id: params.id, influencerTwitterId: user.twitterId, claimed: false })
    .then(notFound(res))
    .then((reward) => reward ? Object.assign(reward, { claimed: true }).save() : null)
    .then(success(res))
    .catch(next)


export const show = ({ params }, res, next) =>
  Rewards.findById(params.id)
    .then(notFound(res))
    .then((campaigns) => campaigns ? campaigns.view() : null)
    .then(success(res))
    .catch(next)
