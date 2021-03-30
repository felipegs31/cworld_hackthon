import { ERoles } from "./ERoles";

export interface IUser {
  id: number
  picture: string
  email: string
  name: string
  role: ERoles
}

