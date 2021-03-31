export interface IReview {
  user: IUserReview
  rate: number
  comment: string
  id: string
  visitDate: Date
  createdAt: string
  updatedAt: string
  editable?: boolean
}

interface IUserReview {
  id: string,
  name: string,
  picture: string
}


export interface IReviewData {
  rate: number | null
  comment: string
  visitDate: Date
}
