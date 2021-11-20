import { action } from 'typesafe-actions'
import { ActionTypes } from './types'
import { IPayload } from '../../../../utils/models/IPayload';
import { ICampaign, ICampaignData } from '../models/ICampaign';

export const campaignsListRequest = () => {
  return action(ActionTypes.CAMPAIGNS_LIST_REQUEST)
}

export const campaignsListSuccess = (data: IPayload<ICampaign[]>) =>
  action(ActionTypes.CAMPAIGNS_LIST_SUCCESS, data)

export const campaignsListError = (message: string) =>
  action(ActionTypes.CAMPAIGNS_LIST_ERROR, message)


export const campaignsListChangeLimit = (limit: number) =>
  action(ActionTypes.CAMPAIGNS_LIST_CHANGE_LIMIT, limit)

export const campaignsListChangePage = (page: number) =>
  action(ActionTypes.CAMPAIGNS_LIST_CHANGE_PAGE, page)

export const campaignsListChangeSort = (sortAsc: boolean, sort: string) =>
  action(ActionTypes.CAMPAIGNS_LIST_CHANGE_SORT, { sortAsc, sort })

export const campaignsListChangeSearchText = (text: string) =>
  action(ActionTypes.CAMPAIGNS_LIST_CHANGE_SEARCH_TEXT, text)


// Open modal Campaign
export const openCampaignModal = (campaign?: ICampaign) =>
  action(ActionTypes.OPEN_CAMPAIGN_MODAL, campaign)

export const openCampaignDetails = (campaign?: ICampaign) =>
  action(ActionTypes.OPEN_CAMPAIGN_DETAILS, campaign)



export const closeCampaignModal = () =>
  action(ActionTypes.CLOSE_CAMPAIGN_MODAL)


// Submit User
export const postCampaign = (campaign: ICampaignData) =>
  action(ActionTypes.POST_CAMPAIGN, campaign)

export const postCampaignSuccess = () =>
  action(ActionTypes.POST_CAMPAIGN_SUCCESS)

export const postCampaignError = () =>
  action(ActionTypes.POST_CAMPAIGN_ERROR)

export const putCampaign = (campaign: ICampaignData) =>
  action(ActionTypes.PUT_CAMPAIGN, campaign)

export const putCampaignSuccess = () =>
  action(ActionTypes.PUT_CAMPAIGN_SUCCESS)

export const putCampaignError = () =>
  action(ActionTypes.PUT_CAMPAIGN_ERROR)

export const deleteCampaign = () =>
  action(ActionTypes.DELETE_CAMPAIGN)

export const deleteCampaignSuccess = () =>
  action(ActionTypes.DELETE_CAMPAIGN_SUCCESS)

export const deleteCampaignError = () =>
  action(ActionTypes.DELETE_CAMPAIGN_ERROR)
