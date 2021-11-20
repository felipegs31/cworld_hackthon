export interface ITweet {
  text: string
  author_id: string,
  created_at: Date,
  lang: string,
  id: string,
  sentiment: ISentiment
}

export interface ISentiment {
  Index: string
  Sentiment: string,
  SentimentScore: {
    Positive: number,
    Negative: number,
    Neutral: number,
    Mixed: number
  }
}
