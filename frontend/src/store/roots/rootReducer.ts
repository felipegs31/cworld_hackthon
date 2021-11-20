import { ICampaignsListState } from '../../modules/campaigns/list/state/types'
import { ICampaignDetailState } from '../../modules/campaigns/detail/state/types'
import { IUsersListState } from './../../modules/users/list/state/types'

import { combineReducers } from 'redux'
import { IAuthState } from '../../modules/auth/state/types'

import { authReducer } from '../../modules/auth/state/reducers'
import { campaignsListReducer } from '../../modules/campaigns/list/state/reducers'
import { campaignDetailReducer } from '../../modules/campaigns/detail/state/reducers'
import { usersListReducer } from './../../modules/users/list/state/reducers'
import {reducer as toastrReducer} from 'react-redux-toastr'
import { ActionTypes } from './../../modules/auth/state/types'
export interface IApplicationState {
	auth: IAuthState,
	campaignsList: ICampaignsListState,
	campaignDetail: ICampaignDetailState,
  usersList: IUsersListState,
  toastr: any
}

const appReducer = combineReducers<IApplicationState>({
  auth: authReducer,
  campaignsList: campaignsListReducer,
  campaignDetail: campaignDetailReducer,
  usersList: usersListReducer,
  toastr: toastrReducer
});

const rootReducer = (state: any, action: any) => {
	if (action.type === ActionTypes.LOGOUT) {
		state = undefined;
	}

	return appReducer(state, action);
};

export default rootReducer
