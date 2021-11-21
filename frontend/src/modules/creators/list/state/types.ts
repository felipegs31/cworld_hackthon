import { IPayload } from '../../../../utils/models/IPayload';
import { IReward } from '../models/IReward';
/**
 * Action types
 */
export enum ActionTypes {
  REWARDS_LIST_REQUEST = '@creators_list/REWARDS_LIST_REQUEST',
  REWARDS_LIST_SUCCESS = '@creators_list/REWARDS_LIST_SUCCESS',
  REWARDS_LIST_ERROR = '@creators_list/REWARDS_LIST_ERROR',

  ADD_KEY_USER_REQUEST = '@creators_list/ADD_KEY_USER_REQUEST',
  ADD_KEY_USER_SUCCESS = '@creators_list/ADD_KEY_USER_SUCCESS',
  ADD_KEY_USER_ERROR = '@creators_list/ADD_KEY_USER_ERROR',
}


/**
 * State type
 */
export interface ICreatorsListState {
  readonly loading: boolean
  readonly error: boolean
  readonly rewards: IPayload<IReward[]>
}
