import rp from 'request-promise'
import AWS from 'aws-sdk'

export const fetchTwitter = async (campaign) => {
  const data = await rp({
    method: 'GET',
    uri: `https://api.twitter.com/2/tweets/search/recent?tweet.fields=lang,created_at&expansions=author_id&query=${campaign.queryText} lang:pt`,
    headers: {
      'Authorization': `Bearer ${env.TWITTER_BEARER_TOKEN}`
    },
    json: true
  })
  return data
}

export const detectSentiment = async (tweets) => {
  const comprehend = new AWS.Comprehend({ region: "us-east-1" })
  const TextList = tweets.data.map(item => {
    return item.text
  })
  try {
    const sentiment = await comprehend.batchDetectSentiment({
      LanguageCode: 'pt',
      TextList
    }).promise()
    const tweetsWithSentiment = tweets.data.map((item, index) => (
      {
        ...item,
        sentiment: sentiment.ResultList[index]
      }))
    return tweetsWithSentiment
  } catch (error) {
    console.log("error", error)
    return []
  }
}
