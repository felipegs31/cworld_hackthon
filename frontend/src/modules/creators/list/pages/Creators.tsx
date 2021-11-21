import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import { IPayload } from '../../../../utils/models/IPayload';
import { IReward } from '../models/IReward';
import SpinnerOverlay from '../../../../design-system/SpinnerOverlay/SpinnerOverlay';
import { isEmpty } from 'lodash';
import { IUser } from '../../../auth/models/IUser';
import SaveIcon from '@material-ui/icons/Save';
import {
  Typography,
  IconButton,
  TextField,
  FormControl,
  Slider,
  FormLabel,
  Grid,
  Button,
  Icon
} from '@material-ui/core/'
import TweetEmbed from 'react-tweet-embed'


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

  const [twitterId, setTwitterId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const rewards: IPayload<IReward[]> = useSelector((state: IApplicationState) => state.creatorsList.rewards)
  const loading: boolean = useSelector((state: IApplicationState) => state.creatorsList.loading)

  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)

  useEffect(() => {
    if (user.twitterId) {
      setTwitterId(user.twitterId)
    }

    if (user.walletAddress) {
      setWalletAddress(user.walletAddress)
    }
    
  }, [user])


  const saveUser = () => {
    dispatch(actions.addKeyRequest(twitterId, walletAddress))
  }

  const rewardsListRequest = () => {
    dispatch(actions.rewardsListRequest())
  }

  useEffect(() => {
    rewardsListRequest()
  }, [])

  return (
    <>
      <div className={classes.root}>
        {(user.twitterId && user.walletAddress) ?
          <>
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
                {rewards.rows.map(reward => 
                  <div key={reward.id}>
                     <TweetEmbed id={reward.tweetId} key={reward.tweetId}/>
                  </div>)}
              </Grid>
            </div>
            {(isEmpty(rewards.rows) && !loading) && <div className={classes.noReviewMessage}>No Reward Found</div>}

          </> :
          <div>
            <FormControl fullWidth margin='normal' required>
              <TextField
                label="Twitter ID"
                value={twitterId}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTwitterId(event.target.value)
                }}
              />
            </FormControl>
            <FormControl fullWidth margin='normal' required>
              <TextField
                label="Walled PUBLIC Key"
                value={walletAddress}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setWalletAddress(event.target.value)
                }}
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => saveUser()}
            >
              Save
            </Button>

          </div>
        }
        </div>
    </>
  )
}

export default Creators
