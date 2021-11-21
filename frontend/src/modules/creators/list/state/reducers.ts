import { IPayload } from '../../../../utils/models/IPayload';
import { Reducer } from 'redux';
import { ActionTypes, ICreatorsListState } from './types'
import { IReward } from '../models/IReward';
import { isEmpty } from 'lodash';

export const INITIAL_STATE: ICreatorsListState = {
	loading: false,
  error: false,
  rewards: {
    count: 0,
    rows: []
  } as IPayload<IReward[]>,
}

const rewardsListRequest = (state: ICreatorsListState) :ICreatorsListState => {
  return {
    ...state,
    loading: true
  }
}

const rewardsListSuccess = (state: ICreatorsListState, {type, payload}: {
  type: string,
  payload: IPayload<IReward[]>
} ): ICreatorsListState => {
  return {
    ...state,
    loading: false,
    rewards: payload
  }
}

const rewardsListError = (state: ICreatorsListState): ICreatorsListState => {
  return {
    ...state,
    loading: false
  }
}

export const creatorsListReducer: Reducer<ICreatorsListState> = (
	state: ICreatorsListState = INITIAL_STATE,
	action: any
): ICreatorsListState => {
	switch (action.type) {
		case ActionTypes.REWARDS_LIST_REQUEST: return rewardsListRequest(state)
		case ActionTypes.REWARDS_LIST_SUCCESS: return rewardsListSuccess(state, action)
		case ActionTypes.REWARDS_LIST_ERROR: return rewardsListError(state)

		default:
			return state
	}
}
