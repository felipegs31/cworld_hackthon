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
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import { IRestaurant } from '../../models/IRestaurant';
import { isEmpty } from 'lodash'
import { IRatesPercent } from '../../models/IRatesPercent';
import { IReview } from '../../models/IReviews';
import { IPayload } from '../../../../../utils/models/IPayload';
import EditIcon from '@material-ui/icons/Edit';
import * as actions from './../../state/actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100%'
  },
  avatar: {
    width: '2.75rem',
    height: '2.75rem',
    marginRight: 10
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    fontWeight: 700
  },
  dates: {
    color: '#6a6f73'
  },
  comment: {
    marginTop: 10
  }
}))

interface props {
  review: IReview,
  canEdit?: boolean
}

const ReviewsCard: React.FC<props> = ({ review, canEdit }: props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleOpenReviewModal = (review: IReview) => {
    dispatch(actions.openReviewModal(review))
  }

  return (
    <div className={classes.container}>
      <div>
        <Avatar src={review.user.picture} className={classes.avatar} />
        <IconButton onClick={() => handleOpenReviewModal(review)}><EditIcon /></IconButton>
      </div>
      <div className={classes.bodyContainer}>
        <div className={classes.name}>{review.user.name}</div>
        <div className={classes.dates}>Visit Date: {new Date(review.visitDate).toLocaleDateString()}</div>
        <Rating value={review.rate} readOnly precision={0.25}/>
        <div className={classes.comment}>{review.comment}</div>
        <div className={classes.dates}>Posted On: {new Date(review.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export default ReviewsCard
