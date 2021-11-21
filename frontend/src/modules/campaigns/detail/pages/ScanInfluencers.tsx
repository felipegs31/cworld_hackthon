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
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: 'center'
  },
  positiveLabel: {
    fontSize: '2rem',
    textAlign: 'center',
    width: '100%'
  },
  tweetContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  tweetEmbed: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: -10,
    fontSize: '2rem'
  },
  cancelIcon: {
    color: "#f45959"
  },
  checkIcon: {
    color: "#008000"
  }
}))

const ScanInfluencers: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tweets: Array<ITweet> = useSelector((state: IApplicationState) => state.campaignDetail.tweets)
  const positiveTweets: number = useSelector((state: IApplicationState) => state.campaignDetail.positiveTweets)

  const scanInfluencersRequest = () => {
    dispatch(actions.scanInfluencersRequest())
  }

  useEffect(() => {
    scanInfluencersRequest()
  }, [])

  return (
    <div className={classes.root}>
      {console.log('tweets', tweets)}
      <div className={classes.positiveLabel}>Positive: {positiveTweets}/10</div>
      {tweets && tweets.map(tweet => 
        <div className={classes.tweetContainer}>
          <div className={classes.tweetEmbed}>
            {tweet.sentiment.SentimentScore.Positive <= 0.90 && <CancelIcon className={`${classes.icon} ${classes.cancelIcon}`}/>}
            {tweet.sentiment.SentimentScore.Positive > 0.90 && <CheckCircleIcon className={`${classes.icon} ${classes.checkIcon}`}/>}
            <TweetEmbed id={tweet.id} options={{cards: 'hidden' }} key={tweet.id}/>
          </div>
          <div>
            PUT GAUGE HERE
          </div>
        </div>
      )}

    </div>
  )
}

export default ScanInfluencers
