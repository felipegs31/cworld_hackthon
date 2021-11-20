import { IPayload } from '../../../../utils/models/IPayload';
import { ICampaign } from '../models/ICampaign';
/**
 * Action types
 */
export enum ActionTypes {
  CAMPAIGNS_LIST_REQUEST = '@campaigns_list/CAMPAIGNS_LIST_REQUEST',
  CAMPAIGNS_LIST_SUCCESS = '@campaigns_list/CAMPAIGNS_LIST_SUCCESS',
  CAMPAIGNS_LIST_ERROR = '@campaigns_list/CAMPAIGNS_LIST_ERROR',

  CAMPAIGNS_LIST_CHANGE_LIMIT = '@campaigns_list/CAMPAIGNS_LIST_CHANGE_LIMIT',
  CAMPAIGNS_LIST_CHANGE_PAGE = '@campaigns_list/CAMPAIGNS_LIST_CHANGE_PAGE',
  CAMPAIGNS_LIST_CHANGE_SORT = '@campaigns_list/CAMPAIGNS_LIST_CHANGE_SORT',
  CAMPAIGNS_LIST_CHANGE_SEARCH_TEXT = '@campaigns_list/CAMPAIGNS_LIST_CHANGE_SEARCH_TEXT',

  OPEN_CAMPAIGN_MODAL = '@campaigns_list/OPEN_CAMPAIGN_MODAL',
  CLOSE_CAMPAIGN_MODAL = '@campaigns_list/CLOSE_CAMPAIGN_MODAL',

  POST_CAMPAIGN = '@campaigns_list/POST_CAMPAIGN',
  POST_CAMPAIGN_SUCCESS = '@campaigns_list/POST_CAMPAIGN_SUCCESS',
  POST_CAMPAIGN_ERROR = '@campaigns_list/POST_CAMPAIGN_ERROR',

  PUT_CAMPAIGN = '@campaigns_list/PUT_CAMPAIGN',
  PUT_CAMPAIGN_SUCCESS = '@campaigns_list/PUT_CAMPAIGN_SUCCESS',
  PUT_CAMPAIGN_ERROR = '@campaigns_list/PUT_CAMPAIGN_ERROR',

  DELETE_CAMPAIGN = '@campaigns_list/DELETE_CAMPAIGN',
  DELETE_CAMPAIGN_SUCCESS = '@campaigns_list/DELETE_CAMPAIGN_SUCCESS',
  DELETE_CAMPAIGN_ERROR = '@campaigns_list/DELETE_CAMPAIGN_ERROR',

}


/**
 * State type
 */
export interface ICampaignsListState {
  readonly loading: boolean
  readonly error: boolean
  readonly campaigns: IPayload<ICampaign[]>
  readonly page: number
  readonly sort: string
  readonly limit: number
  readonly searchText: string
  readonly sortAsc: boolean

  readonly campaignModalOpen: boolean
  readonly campaignModalLoading: boolean
  readonly campaignToEdit: ICampaign
}
