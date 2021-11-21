import { IUser } from '../../../auth/models/IUser';
import { IReview } from '../models/IReviews';
import { IPayload } from '../../../../utils/models/IPayload';
import { IRestaurant } from '../models/IRestaurant';
import { Reducer } from 'redux';
import { ActionTypes, ICampaignDetailState } from './types'
import { IRatesPercent } from '../models/IRatesPercent';
import { isEmpty } from 'lodash';
import { ICampaign } from '../models/ICampaign';
import { ITweet } from '../models/ITweet';
import { ECampaignTabs } from '../models/ECampaignTabs';
import { IReward } from '../models/IReward';

export const INITIAL_STATE: ICampaignDetailState = {
	campaignLoading: false,
	tweetsLoading: false,
	rewardsLoading: false,


  error: false,
  campaign: {} as ICampaign,
  tweets: [] as ITweet[],
  positiveTweets: 0,
  rewards: {} as IPayload<IReward[]>,

  tab: ECampaignTabs.CAMPAIGNDETAILS
}

// CAMPAIGN

const campaignDetailRequest = (state: ICampaignDetailState) :ICampaignDetailState => {
  return {
    ...state,
    campaignLoading: true,
    error: false
  }
}

const campaignDetailSuccess = (state: ICampaignDetailState, {type, payload}: {
  type: string,
  payload: ICampaign
} ): ICampaignDetailState => {

  return {
    ...state,
    campaignLoading: false,
    campaign: payload,
  }
}

const campaignDetailError = (state: ICampaignDetailState): ICampaignDetailState => {
  return {
    ...state,
    campaignLoading: false,
    error: true
  }
}

// SCAN INFLUENCERS

const scanInfluencersRequest = (state: ICampaignDetailState) :ICampaignDetailState => {
  return {
    ...state,
    tweetsLoading: true,
    error: false
  }
}

const scanInfluencersSuccess = (state: ICampaignDetailState, {type, payload}: {
  type: string,
  payload: {data: Array<ITweet>}
} ): ICampaignDetailState => {

  const positive = payload.data.filter(tweet => tweet.sentiment.SentimentScore.Positive > 0.90) || []

  return {
    ...state,
    rewardsLoading: false,
    tweets: payload.data,
    positiveTweets: positive.length
  }
}

const scanInfluencersError = (state: ICampaignDetailState): ICampaignDetailState => {
  return {
    ...state,
    tweetsLoading: false,
    error: true
  }
}

// SELECTED INFLUENCERS

const selectedInfluencersRequest = (state: ICampaignDetailState) :ICampaignDetailState => {
  return {
    ...state,
    rewardsLoading: true,
    error: false
  }
}

const selectedInfluencersSuccess = (state: ICampaignDetailState, {type, payload}: {
  type: string,
  payload: {data: IPayload<IReward[]>}
} ): ICampaignDetailState => {

  return {
    ...state,
    rewardsLoading: false,
    rewards: payload.data,
  }
}

const selectedInfluencersError = (state: ICampaignDetailState): ICampaignDetailState => {
  return {
    ...state,
    rewardsLoading: false,
    error: true
  }
}

const setTabCampaign = (state: ICampaignDetailState, action: any ): ICampaignDetailState => {
  console.log('action', action)
  return {
    ...state,
    tab: action.payload.tab
  }
}

export const campaignDetailReducer: Reducer<ICampaignDetailState> = (
	state: ICampaignDetailState = INITIAL_STATE,
	action: any
): ICampaignDetailState => {
	switch (action.type) {
		case ActionTypes.CAMPAIGN_DETAIL_REQUEST: return campaignDetailRequest(state)
		case ActionTypes.CAMPAIGN_DETAIL_SUCCESS: return campaignDetailSuccess(state, action)
		case ActionTypes.CAMPAIGN_DETAIL_ERROR: return campaignDetailError(state)

    case ActionTypes.SCAN_INFLUENCERS_REQUEST: return scanInfluencersRequest(state)
		case ActionTypes.SCAN_INFLUENCERS_SUCCESS: return scanInfluencersSuccess(state, action)
		case ActionTypes.SCAN_INFLUENCERS_ERROR: return scanInfluencersError(state)

    case ActionTypes.SELECTED_INFLUENCERS_REQUEST: return selectedInfluencersRequest(state)
		case ActionTypes.SELECTED_INFLUENCERS_SUCCESS: return selectedInfluencersSuccess(state, action)
		case ActionTypes.SELECTED_INFLUENCERS_ERROR: return selectedInfluencersError(state)

    case ActionTypes.SET_TAB_CAMPAIGN: return setTabCampaign(state, action)

		default:
			return state
	}
}
