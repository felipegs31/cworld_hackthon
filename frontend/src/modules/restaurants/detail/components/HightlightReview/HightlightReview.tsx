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

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 30,
    marginTop: 20
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
  }
}))


const HightlightReview: React.FC = () => {
  const classes = useStyles()
  const reviewHighest: IReview = useSelector((state: IApplicationState) => state.restaurantDetail.reviewHighest)
  const reviewLowest: IReview = useSelector((state: IApplicationState) => state.restaurantDetail.reviewLowest)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper className={classes.container}>
          <span className={classes.title}>Highest Review</span>
          {!isEmpty(reviewHighest) && <ReviewsCard review={reviewHighest}/>}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.container}>
          <span className={classes.title}>Lowest Review</span>
          {!isEmpty(reviewLowest) && <ReviewsCard review={reviewLowest}/>}
        </Paper>
      </Grid>
    </Grid>
)
}

export default HightlightReview
