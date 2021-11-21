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
      {console.log('tweets', tweets)}
      {tweets && tweets.map(tweet => 
        <div>
          <TweetEmbed id={tweet.id} options={{ theme: 'light' }} key={tweet.id}/>
        </div>
      )}

    </div>
  )
}

export default ScanInfluencers
