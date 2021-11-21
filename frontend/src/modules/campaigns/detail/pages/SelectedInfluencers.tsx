import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Dialog
} from '@material-ui/core/'
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import { ICampaign, ICampaignData } from '../../../campaigns/list/models/ICampaign';
import { ITweet } from '../models/ITweet';
import TweetEmbed from 'react-tweet-embed'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: 'center'
  },
  positive: {
    border: '1px solid #00ff00',
    maxWidth: 550,
    marginBottom: 10
  },
  negative: {
    border: '1px solid #ff0000',
    maxWidth: 550,
    marginBottom: 10
  },
  positiveLabel: {
    fontSize: '2rem',
    textAlign: 'center',
    width: '100%'
  }
}))

const SelectedInfluencers: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const rewards: Array<ITweet> = useSelector((state: IApplicationState) => state.campaignDetail.rewards)

  const selectedInfluencersRequest = () => {
    dispatch(actions.selectedInfluencersRequest())
  }

  useEffect(() => {
    console.log('HELLO')
    selectedInfluencersRequest()
  }, [])

  return (
    <div className={classes.root}>
      hey
      {console.log('rewards', rewards)}

    </div>
  )
}

export default SelectedInfluencers
