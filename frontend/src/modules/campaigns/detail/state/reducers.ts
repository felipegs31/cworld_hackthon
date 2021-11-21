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

export const INITIAL_STATE: ICampaignDetailState = {
	loading: false,
  error: false,
  campaign: {} as ICampaign,
  tweets: [] as ITweet[],
  positiveTweets: 0,
  tab: ECampaignTabs.CAMPAIGNDETAILS
}


const campaignDetailRequest = (state: ICampaignDetailState) :ICampaignDetailState => {
  return {
    ...state,
    loading: true,
    error: false
  }
}

const campaignDetailSuccess = (state: ICampaignDetailState, {type, payload}: {
  type: string,
  payload: ICampaign
} ): ICampaignDetailState => {

  return {
    ...state,
    loading: false,
    campaign: payload,
  }
}

const campaignDetailError = (state: ICampaignDetailState): ICampaignDetailState => {
  return {
    ...state,
    loading: false,
    error: true
  }
}

const scanInfluencersRequest = (state: ICampaignDetailState) :ICampaignDetailState => {
  return {
    ...state,
    loading: true,
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
    loading: false,
    tweets: payload.data,
    positiveTweets: positive.length
  }
}

const scanInfluencersError = (state: ICampaignDetailState): ICampaignDetailState => {
  return {
    ...state,
    loading: false,
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

    case ActionTypes.SET_TAB_CAMPAIGN: return setTabCampaign(state, action)

		default:
			return state
	}
}
