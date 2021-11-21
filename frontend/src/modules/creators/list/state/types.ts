import { IPayload } from '../../../../utils/models/IPayload';
import { ICampaign } from '../models/ICampaign';
/**
 * Action types
 */
export enum ActionTypes {
  REWARDS_LIST_REQUEST = '@creators_list/REWARDS_LIST_REQUEST',
  REWARDS_LIST_SUCCESS = '@creators_list/REWARDS_LIST_SUCCESS',
  REWARDS_LIST_ERROR = '@creators_list/REWARDS_LIST_ERROR',
}


/**
 * State type
 */
export interface ICreatorsListState {
  readonly loading: boolean
  readonly error: boolean
  readonly rewards: IPayload<ICampaign[]>
  readonly page: number
  readonly sort: string
  readonly limit: number
  readonly searchText: string
  readonly sortAsc: boolean

  readonly campaignModalOpen: boolean
  readonly campaignModalLoading: boolean
  readonly campaignToEdit: ICampaign
  readonly campaign: ICampaign

}
