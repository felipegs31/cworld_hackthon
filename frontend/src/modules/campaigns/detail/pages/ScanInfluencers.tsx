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

const ScanInfluencers: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tweets: Array<ITweet> = useSelector((state: IApplicationState) => state.campaignDetail.tweets)
  const positiveTweets: number = useSelector((state: IApplicationState) => state.campaignDetail.positiveTweets)

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
      <div className={classes.positiveLabel}>Positive: {positiveTweets}/10</div>
      {tweets && tweets.map(tweet => 
        <div className={tweet.sentiment.SentimentScore.Positive > 0.90 ? classes.positive : classes.negative}>
          <TweetEmbed id={tweet.id} options={{cards: 'hidden' }} key={tweet.id}/>
        </div>
      )}

    </div>
  )
}

export default ScanInfluencers
