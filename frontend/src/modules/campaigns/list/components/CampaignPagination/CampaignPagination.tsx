import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TablePagination
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../state/actions';
import { IApplicationState } from '../../../../../store/roots/rootReducer';

import { IPayload } from '../../../../../utils/models/IPayload';
import { ICampaign } from '../../models/ICampaign';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  pagination: {
    textAlign: 'right',
    marginTop: 20
  }
}))

const CampaignPagination: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const campaigns: IPayload<ICampaign[]> = useSelector((state: IApplicationState) => state.campaignsList.campaigns)
  const limit: number = useSelector((state: IApplicationState) => state.campaignsList.limit)
  const page: number = useSelector((state: IApplicationState) => state.campaignsList.page)

  const handleChangePageCampaign = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(actions.campaignsListChangePage(value))
  }

  return (
    <div className={classes.pagination}>
      <Pagination count={Math.ceil(campaigns.count/limit)} page={page} onChange={handleChangePageCampaign} />
    </div>
  )
}

export default CampaignPagination
