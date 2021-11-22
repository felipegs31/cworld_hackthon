import rp from 'request-promise'
import AWS from 'aws-sdk'

export const fetchTwitter = async (campaign) => {
  const response = await rp({
    method: 'GET',
    uri: `https://api.twitter.com/2/tweets/search/recent?tweet.fields=lang,created_at&expansions=author_id&user.fields=name,username&query=${campaign.queryText} lang:en`,
    headers: {
      'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    },
    json: true
  })

  const data = response.data.map((item, index) => {
    return {
      ...response.includes.users[index],
      ...item
    }
  })
  return {
    data
  }
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
