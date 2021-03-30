import { IPayload } from '../../../../utils/models/IPayload';
import { IRestaurant } from '../models/IRestaurant';
/**
 * Action types
 */
export enum ActionTypes {
  RESTAURANTS_LIST_REQUEST = '@restaurants_list/RESTAURANTS_LIST_REQUEST',
  RESTAURANTS_LIST_SUCCESS = '@restaurants_list/RESTAURANTS_LIST_SUCCESS',
  RESTAURANTS_LIST_ERROR = '@restaurants_list/RESTAURANTS_LIST_ERROR',
}


/**
 * State type
 */
export interface IRestaurantsListState {
  readonly loading: boolean
  readonly error: boolean
  readonly restaurants: IPayload<IRestaurant[]>
  readonly page: number
  readonly sort: string
  readonly limit: number
  readonly searchText: string
  readonly sortAsc: boolean
}
