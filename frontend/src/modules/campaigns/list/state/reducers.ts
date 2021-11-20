import { IPayload } from '../../../../utils/models/IPayload';
import { Reducer } from 'redux';
import { ActionTypes, ICampaignsListState } from './types'
import { ICampaign } from '../models/ICampaign';
import { isEmpty } from 'lodash';

export const INITIAL_STATE: ICampaignsListState = {
	loading: false,
  error: false,
  campaigns: {
    count: 0,
    rows: []
  } as IPayload<ICampaign[]>,
  page: 1,
  sort: 'averageRate',
  limit: 6,
  searchText: '',
  sortAsc: false,

  campaignModalOpen: false,
  campaignModalLoading: false,
  campaignToEdit: {} as ICampaign
}

const campaignsListRequest = (state: ICampaignsListState) :ICampaignsListState => {
  return {
    ...state,
    loading: true
  }
}

const campaignsListSuccess = (state: ICampaignsListState, {type, payload}: {
  type: string,
  payload: IPayload<ICampaign[]>
} ): ICampaignsListState => {
  return {
    ...state,
    loading: false,
    campaigns: payload
  }
}

const campaignsListError = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    loading: false
  }
}

const campaignsListChangeLimit = (state: ICampaignsListState, {type, payload}: {
  type: string,
  payload: number
}): ICampaignsListState => {
  return {
    ...state,
    limit: payload,
    page: 1,
    loading: true
  }
}

const campaignsListChangePage = (state: ICampaignsListState, {type, payload}: {
  type: string,
  payload: number
}): ICampaignsListState => {
  return {
    ...state,
    page: payload,
    loading: true
  }
}

const campaignsListChangeSort = (state: ICampaignsListState, {type, payload}: {
  type: string,
  payload: {sortAsc: boolean, sort: string}
}): ICampaignsListState => {
  return {
    ...state,
    sortAsc: payload.sortAsc,
    sort: payload.sort,
    loading: true
  }
}

const campaignsListChangeSearchText = (state: ICampaignsListState, {type, payload}: {
  type: string,
  payload: string
}): ICampaignsListState => {
  return {
    ...state,
    loading: true,
    searchText: payload,
    page: 1
  }
}

const openRestaurantModal = (state: ICampaignsListState, {type, payload}: {
  type: string,
  payload: ICampaign
} ): ICampaignsListState => {

  return {
    ...state,
    campaignModalOpen: true,
    campaignToEdit: !isEmpty(payload) ? payload : {} as ICampaign
  }
}

const closeRestaurantModal = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalOpen: false,
    campaignToEdit: {} as ICampaign
  }
}

const postRestaurant = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalLoading: true,
  }
}

const postRestaurantSuccess = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalLoading: false,
    campaignModalOpen: false
  }
}

const postRestaurantError = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalLoading: false
  }
}

const putRestaurant = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalLoading: true,
  }
}

const putRestaurantSuccess = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalOpen: false,
    campaignModalLoading: false,
    campaignToEdit: {} as ICampaign,
    loading: true
  }
}

const putRestaurantError = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalLoading: false
  }
}

const deleteRestaurant = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalLoading: true,
  }
}

const deleteRestaurantSuccess = (state: ICampaignsListState): ICampaignsListState => {
  let page = state.page
  if (state.campaigns.rows.length === 1) {
    page = page > 1 ? page - 1 : 1
  }

  return {
    ...state,
    campaignModalOpen: false,
    campaignModalLoading: false,
    campaignToEdit: {} as ICampaign,
    page,
    loading: true
  }
}

const deleteRestaurantError = (state: ICampaignsListState): ICampaignsListState => {
  return {
    ...state,
    campaignModalLoading: false
  }
}

export const campaignsListReducer: Reducer<ICampaignsListState> = (
	state: ICampaignsListState = INITIAL_STATE,
	action: any
): ICampaignsListState => {
	switch (action.type) {
		case ActionTypes.CAMPAIGNS_LIST_REQUEST: return campaignsListRequest(state)
		case ActionTypes.CAMPAIGNS_LIST_SUCCESS: return campaignsListSuccess(state, action)
		case ActionTypes.CAMPAIGNS_LIST_ERROR: return campaignsListError(state)

    case ActionTypes.CAMPAIGNS_LIST_CHANGE_LIMIT: return campaignsListChangeLimit(state, action)
		case ActionTypes.CAMPAIGNS_LIST_CHANGE_PAGE: return campaignsListChangePage(state, action)
		case ActionTypes.CAMPAIGNS_LIST_CHANGE_SORT: return campaignsListChangeSort(state, action)
		case ActionTypes.CAMPAIGNS_LIST_CHANGE_SEARCH_TEXT: return campaignsListChangeSearchText(state, action)

    case ActionTypes.OPEN_CAMPAIGN_MODAL: return openRestaurantModal(state, action)
		case ActionTypes.CLOSE_CAMPAIGN_MODAL: return closeRestaurantModal(state)

    case ActionTypes.POST_CAMPAIGN: return postRestaurant(state)
		case ActionTypes.POST_CAMPAIGN_SUCCESS: return postRestaurantSuccess(state)
		case ActionTypes.POST_CAMPAIGN_ERROR: return postRestaurantError(state)

		case ActionTypes.PUT_CAMPAIGN: return putRestaurant(state)
		case ActionTypes.PUT_CAMPAIGN_SUCCESS: return putRestaurantSuccess(state)
		case ActionTypes.PUT_CAMPAIGN_ERROR: return putRestaurantError(state)

		case ActionTypes.DELETE_CAMPAIGN: return deleteRestaurant(state)
		case ActionTypes.DELETE_CAMPAIGN_SUCCESS: return deleteRestaurantSuccess(state)
		case ActionTypes.DELETE_CAMPAIGN_ERROR: return deleteRestaurantError(state)

		default:
			return state
	}
}
