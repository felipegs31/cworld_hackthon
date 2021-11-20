import { ERoles } from "./ERoles";

export interface IUser {
  id: string
  picture: string
  email: string
  name: string
  role: ERoles
}

