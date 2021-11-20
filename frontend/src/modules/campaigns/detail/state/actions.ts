import { IUser } from '../../../auth/models/IUser';
import { IReview, IReviewData } from '../models/IReviews';
import { IPayload } from '../../../../utils/models/IPayload';
import { ICampaign } from '../models/ICampaign';
import { action } from 'typesafe-actions'
import { ActionTypes } from './types'
import { ECampaignTabs } from '../models/ECampaignTabs';
import { ITweet } from '../models/ITweet';


// Restaurants
export const campaignDetailRequest = () => {
	return action(ActionTypes.CAMPAIGN_DETAIL_REQUEST)
}
export const campaignDetailSuccess = (data: ICampaign) =>
  action(ActionTypes.CAMPAIGN_DETAIL_SUCCESS, data)

export const campaignDetailError = (message: string) =>
	action(ActionTypes.CAMPAIGN_DETAIL_ERROR, message)

export const setTabCampaign = (tab: ECampaignTabs) =>
	action(ActionTypes.SET_TAB_CAMPAIGN, { tab })


export const scanInfluencersRequest = () =>
	action(ActionTypes.SCAN_INFLUENCERS_REQUEST)

export const scanInfluencersSuccess = (data: Array<ITweet>) =>
	action(ActionTypes.SCAN_INFLUENCERS_SUCCESS)
	
export const scanInfluencersError = (message: string) =>
	action(ActionTypes.SCAN_INFLUENCERS_ERROR)

