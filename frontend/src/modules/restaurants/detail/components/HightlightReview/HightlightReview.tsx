import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Paper,
  Grid
} from '@material-ui/core/'
import { useSelector } from 'react-redux'
import { IReview } from '../../models/IReviews';
import ReviewsCard from './../ReviewsCard/ReviewsCard';
import { isEmpty } from 'lodash'
import SpinnerOverlay from '../../../../../design-system/SpinnerOverlay/SpinnerOverlay';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 30,
    marginTop: 20,
    position: 'relative'
  },
  avatar: {
    width: '2.75rem',
    height: '2.75rem',
    marginRight: 10
  },
  devider: {
    height: 1,
    backgroundColor: "#d1d7dc",
    marginTop: 20,
    marginBottom: 20,
    width: '100%'
  },
  title: {
    color: '#6a6f73',
    fontSize: '1.4rem',
    marginBottom: 10,
    fontWeight: 700
  },
  noReviewMessage: {
    color: '#d1d7dc',
    marginTop: 10
  }
}))


const HightlightReview: React.FC = () => {
  const classes = useStyles()
  const reviewHighest: IReview = useSelector((state: IApplicationState) => state.restaurantDetail.reviewHighest)
  const reviewLowest: IReview = useSelector((state: IApplicationState) => state.restaurantDetail.reviewLowest)

  const loadingReviewHighest: boolean = useSelector((state: IApplicationState) => state.restaurantDetail.loadingReviewHighest)
  const loadingReviewLowest: boolean = useSelector((state: IApplicationState) => state.restaurantDetail.loadingReviewLowest)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper className={classes.container}>
          <span className={classes.title}>Highest Review</span>
          {loadingReviewHighest ?
            <SpinnerOverlay /> :
            !isEmpty(reviewHighest) ?
              <ReviewsCard review={reviewHighest}/> :
              <div className={classes.noReviewMessage}>No Review Found</div>
          }
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.container}>
          <span className={classes.title}>Lowest Review</span>
          {loadingReviewLowest ?
            <SpinnerOverlay /> :
            !isEmpty(reviewLowest) ?
              <ReviewsCard review={reviewLowest}/> :
              <div className={classes.noReviewMessage}>No Review Found</div>
          }
        </Paper>
      </Grid>
    </Grid>
)
}

export default HightlightReview
