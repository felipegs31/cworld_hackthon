export interface ITweet {
  text: string
  author_id: string,
  created_at: string,
  lang: string,
  id: string,
  sentiment: ISentiment
  username: string
  name: string
}

export interface ISentiment {
  Index: number
  Sentiment: string,
  SentimentScore: {
    Positive: number,
    Negative: number,
    Neutral: number,
    Mixed: number
  }
}
