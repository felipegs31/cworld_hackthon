export interface IReview {
  user: IUserReview
  rate: number
  comment: string
  id: string
  visitDate: string
  createdAt: string
  updatedAt: string
}

interface IUserReview {
  id: string,
  name: string,
  picture: string
}
