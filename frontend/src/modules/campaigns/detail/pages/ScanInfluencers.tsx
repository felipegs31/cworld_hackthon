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
const TwitterTweetEmbed = require('react-twitter-embed');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}))

const ScanInfluencers: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tweets: Array<ITweet> = useSelector((state: IApplicationState) => state.campaignDetail.tweets)
  const selectedTab = useSelector((state: IApplicationState) => state.campaignDetail.tab)

  const scanInfluencersRequest = () => {
    dispatch(actions.scanInfluencersRequest())
  }

  useEffect(() => {
    console.log('HELLO')
    scanInfluencersRequest()
  }, [])

  return (
    <div className={classes.root}>
      hey
      {tweets.map(tweet => {
        <TwitterTweetEmbed
          tweetId={tweet.id}
        />
      })}

    </div>
  )
}

export default ScanInfluencers
