import { IReview } from '../models/IReviews';
import { IPayload } from '../../../../utils/models/IPayload';
import { IRatesPercent } from '../models/IRatesPercent';
import { ICampaign } from '../models/ICampaign';
import { ITweet } from './../models/ITweet'
import { ECampaignTabs } from '../models/ECampaignTabs';

/**
 * Action types
 */
export enum ActionTypes {
	SET_TAB_CAMPAIGN = '@campaign_detail/SET_TAB_CAMPAIGN',
  CAMPAIGN_DETAIL_REQUEST = '@campaign_detail/CAMPAIGN_DETAIL_REQUEST',
  CAMPAIGN_DETAIL_SUCCESS = '@campaign_detail/CAMPAIGN_DETAIL_SUCCESS',
  CAMPAIGN_DETAIL_ERROR = '@campaign_detail/CAMPAIGN_DETAIL_ERROR',
  
  SCAN_INFLUENCERS_REQUEST = '@campaign_detail/CAMPAIGN_DETAIL_ERROR',
  SCAN_INFLUENCERS_SUCCESS = '@campaign_detail/SCAN_INFLUENCERS_SUCCESS',
  SCAN_INFLUENCERS_ERROR = '@campaign_detail/SCAN_INFLUENCERS_ERROR',
}

/**
 * State type
 */
export interface ICampaignDetailState {
  readonly loading: boolean
  readonly error: boolean
  readonly campaign: ICampaign
  readonly positiveTweets: number
  readonly tweets: Array<ITweet>
  readonly tab: ECampaignTabs,
}
