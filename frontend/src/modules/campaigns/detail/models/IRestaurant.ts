import { IRates } from "./IRates";

export interface IRestaurant {
  name: string
  category: string
  photoUrl: string
  averageRate: number
  id: string
  rates: IRates
}

