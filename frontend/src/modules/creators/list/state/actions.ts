import { action } from 'typesafe-actions'
import { ActionTypes } from './types'
import { IPayload } from '../../../../utils/models/IPayload';
import { ICampaign, ICampaignData } from '../models/ICampaign';

export const rewardsListRequest = () => {
  return action(ActionTypes.REWARDS_LIST_REQUEST)
}
export const rewardsListSuccess = (data: IPayload<ICampaign[]>) =>
  action(ActionTypes.REWARDS_LIST_SUCCESS, data)

export const rewardsListError = (message: string) =>
  action(ActionTypes.REWARDS_LIST_ERROR, message)
