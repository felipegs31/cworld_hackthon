import { action } from 'typesafe-actions'
import { ActionTypes } from './types'
import { IPayload } from '../../../../utils/models/IPayload';
import { IReward } from '../models/IReward';

export const rewardsListRequest = () => {
  return action(ActionTypes.REWARDS_LIST_REQUEST)
}
export const rewardsListSuccess = (data: IPayload<IReward[]>) =>
  action(ActionTypes.REWARDS_LIST_SUCCESS, data)

export const rewardsListError = (message: string) =>
  action(ActionTypes.REWARDS_LIST_ERROR, message)


export const addKeyRequest = (twitterId: string, walletAddress: string) => {
  return action(ActionTypes.ADD_KEY_USER_REQUEST, {twitterId, walletAddress})
}
export const addKeySuccess = (data: IPayload<IReward[]>) =>
  action(ActionTypes.ADD_KEY_USER_SUCCESS, data)

export const addKeyError = (message: string) =>
  action(ActionTypes.ADD_KEY_USER_ERROR, message)
