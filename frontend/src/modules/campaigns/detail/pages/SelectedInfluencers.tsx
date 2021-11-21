import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Container,
  Button,
  CssBaseline,
  Grid,
  Typography,
  CircularProgress,
  AppBar,
  TextField
} from '@material-ui/core';
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import { ICampaign, ICampaignData } from '../../../campaigns/list/models/ICampaign';
import { ITweet } from '../models/ITweet';
import TweetEmbed from 'react-tweet-embed'
import { IReward } from '../models/IReward';
import { IPayload } from '../../../../utils/models/IPayload';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: 'center'
  },
  tweetContainer: {
    position: 'relative'
  },
  claimBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    borderRadius: 30,
    color: "#fff"
  },
  claimed: {
    backgroundColor: "#59a1f4",
  },
  notClaimed: {
    backgroundColor: "#727472",
  }
  
}))

const SelectedInfluencers: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const rewards: IPayload<IReward[]> = useSelector((state: IApplicationState) => state.campaignDetail.rewards)

  const selectedInfluencersRequest = () => {
    dispatch(actions.selectedInfluencersRequest())
  }

  useEffect(() => {
    selectedInfluencersRequest()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {!isEmpty(rewards) && rewards.rows.map((value) => (
          <Grid item xs={6} className={`${classes.tweetContainer}`} key={value.tweetId}>
            {value.claimed &&  <div className={`${classes.claimBadge} ${classes.claimed}`}>Claimed Value</div>}
            {!value.claimed &&  <div className={`${classes.claimBadge} ${classes.notClaimed}`}>Not Claimed</div>}
            <TweetEmbed id={value.tweetId} options={{cards: 'hidden' }} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SelectedInfluencers
