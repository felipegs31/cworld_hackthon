import { IPayload } from '../../../../utils/models/IPayload';
import { IRestaurant } from '../models/IRestaurant';
/**
 * Action types
 */
export enum ActionTypes {
  RESTAURANTS_LIST_REQUEST = '@restaurants_list/RESTAURANTS_LIST_REQUEST',
  RESTAURANTS_LIST_SUCCESS = '@restaurants_list/RESTAURANTS_LIST_SUCCESS',
  RESTAURANTS_LIST_ERROR = '@restaurants_list/RESTAURANTS_LIST_ERROR',

  RESTAURANTS_LIST_CHANGE_LIMIT = '@restaurants_list/RESTAURANTS_LIST_CHANGE_LIMIT',
  RESTAURANTS_LIST_CHANGE_PAGE = '@restaurants_list/RESTAURANTS_LIST_CHANGE_PAGE',
  RESTAURANTS_LIST_CHANGE_SORT = '@restaurants_list/RESTAURANTS_LIST_CHANGE_SORT',
  RESTAURANTS_LIST_CHANGE_SEARCH_TEXT = '@restaurants_list/RESTAURANTS_LIST_CHANGE_SEARCH_TEXT',

  OPEN_RESTAURANT_MODAL = '@restaurants_list/OPEN_RESTAURANT_MODAL',
  CLOSE_RESTAURANT_MODAL = '@restaurants_list/CLOSE_RESTAURANT_MODAL',

  POST_RESTAURANT = '@restaurants_list/POST_RESTAURANT',
  POST_RESTAURANT_SUCCESS = '@restaurants_list/POST_RESTAURANT_SUCCESS',
  POST_RESTAURANT_ERROR = '@restaurants_list/POST_RESTAURANT_ERROR',

  PUT_RESTAURANT = '@restaurants_list/PUT_RESTAURANT',
  PUT_RESTAURANT_SUCCESS = '@restaurants_list/PUT_RESTAURANT_SUCCESS',
  PUT_RESTAURANT_ERROR = '@restaurants_list/PUT_RESTAURANT_ERROR',

  DELETE_RESTAURANT = '@restaurants_list/DELETE_RESTAURANT',
  DELETE_RESTAURANT_SUCCESS = '@restaurants_list/DELETE_RESTAURANT_SUCCESS',
  DELETE_RESTAURANT_ERROR = '@restaurants_list/DELETE_RESTAURANT_ERROR',

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

  readonly restaurantModalOpen: boolean
  readonly restaurantModalLoading: boolean
  readonly restaurantToEdit: IRestaurant
}
