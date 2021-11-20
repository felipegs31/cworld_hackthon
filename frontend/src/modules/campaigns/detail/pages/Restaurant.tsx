import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Dialog
} from '@material-ui/core/'
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header/Header'
import Ratings from '../components/Ratings/Ratings'

import { IRestaurant } from '../models/IRestaurant';
import Reviews from '../components/Reviews/Reviews';
import HightlightReview from '../components/HightlightReview/HightlightReview';
import ReviewModal from '../components/ReviewModal/ReviewModal';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2)
  }
}))

const Restaurant: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const restaurant: IRestaurant = useSelector((state: IApplicationState) => state.restaurantDetail.restaurant)
  const reviewModalOpen: boolean = useSelector((state: IApplicationState) => state.restaurantDetail.reviewModalOpen)


  const restaurantDetailRequest = () => {
    dispatch(actions.restaurantDetailRequest())
  }

  const reviewsRequest = () => {
    dispatch(actions.reviewsRequest())
  }

  const reviewHighestRequest = () => {
    dispatch(actions.reviewHighestRequest())
  }

  const reviewLowestRequest = () => {
    dispatch(actions.reviewLowestRequest())
  }

  const handleCloseReviewModal = () => {
    dispatch(actions.closeReviewModal())
  }

  useEffect(() => {
    restaurantDetailRequest()
    reviewsRequest()
    reviewHighestRequest()
    reviewLowestRequest()
  }, [])

  return (
    <div className={classes.root}>
      <Header />
      <Ratings />
      <HightlightReview />
      <Reviews />
      <Dialog
        scroll='body'
        fullWidth
        open={reviewModalOpen}
        onClose={() => handleCloseReviewModal()}
      >
        <ReviewModal/>
      </Dialog>
    </div>
)
}

export default Restaurant
