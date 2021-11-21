import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Grid,
  Dialog
} from '@material-ui/core/'
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import { IPayload } from '../../../../utils/models/IPayload';
import { ICampaign } from '../models/ICampaign';
import SpinnerOverlay from '../../../../design-system/SpinnerOverlay/SpinnerOverlay';
import { isEmpty } from 'lodash';
import { IUser } from '../../../users/list/models/IUser';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  container: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: '0.5',
    zIndex: 2
  },
  noReviewMessage: {
    color: '#d1d7dc',
    marginTop: 30,
    fontSize: '2rem',
    textAlign: 'center'
  }
}))

const Creators: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const rewards: IPayload<ICampaign[]> = useSelector((state: IApplicationState) => state.creatorsList.rewards)
  const loading: boolean = useSelector((state: IApplicationState) => state.creatorsList.loading)

  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)


  const rewardsListRequest = () => {
    dispatch(actions.rewardsListRequest())
  }

  useEffect(() => {
    rewardsListRequest()
  }, [])

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {loading && <div className={classes.overlay}></div>}
            {loading && <SpinnerOverlay />}
          </Grid>
        </div>
        {(isEmpty(rewards.rows) && !loading) && <div className={classes.noReviewMessage}>No Reward Found</div>}
      </div>

    </>
  )
}

export default Creators
