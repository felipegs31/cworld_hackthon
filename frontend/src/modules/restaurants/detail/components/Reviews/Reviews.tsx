import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Typography,
  IconButton,
  Avatar,
  Paper,
  LinearProgress,
  Grid
} from '@material-ui/core/'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import { IRestaurant } from '../../models/IRestaurant';
import { isEmpty } from 'lodash'
import { IRatesPercent } from '../../models/IRatesPercent';
import { IReview } from '../../models/IReviews';
import { IPayload } from '../../../../../utils/models/IPayload';
import ReviewsCard from './ReviewsCard';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  }
}))


const Reviews: React.FC = () => {
  let history = useHistory()
  const classes = useStyles()

  const reviews: IPayload<IReview[]> = useSelector((state: IApplicationState) => state.restaurantDetail.reviews)

  return (
    <Paper className={classes.container}>
      {!isEmpty(reviews.rows) && reviews.rows.map((review, index) =>
        <>
          <ReviewsCard review={review}/>
          {index < reviews.rows.length - 1 && <div className={classes.devider}></div>}
        </>
      )}
    </Paper>
)
}

export default Reviews
