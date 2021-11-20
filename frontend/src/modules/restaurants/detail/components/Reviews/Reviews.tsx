import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Paper,
  Button,
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { isEmpty } from 'lodash'
import { IReview } from '../../models/IReviews';
import { IPayload } from '../../../../../utils/models/IPayload';
import ReviewsCard from './../ReviewsCard/ReviewsCard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as actions from './../../state/actions';
import SpinnerOverlay from '../../../../../design-system/SpinnerOverlay/SpinnerOverlay';

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
    fontWeight: 700
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%'
  },
  reviewContainer: {
    width: '100%'
  },
  noReviewMessage: {
    color: '#d1d7dc',
    marginTop: 10
  }
}))


const Reviews: React.FC = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const classes = useStyles()

  const reviews: IPayload<IReview[]> = useSelector((state: IApplicationState) => state.restaurantDetail.reviews)
  const loadingReviews: boolean = useSelector((state: IApplicationState) => state.restaurantDetail.loadingReviews)

  const handleOpenReviewModal = () => {
    dispatch(actions.openReviewModal())
  }

  const reviewsRender = () => (
    reviews.rows.map((review, index) =>
      <div className={classes.reviewContainer} key={review.id}>
        <ReviewsCard review={review}/>
        {index < reviews.rows.length - 1 && <div className={classes.devider}></div>}
      </div>
    )
  )

  return (
    <Paper className={classes.container}>
      <div className={classes.action}>
        <span className={classes.title}>Most Recent Review </span>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddCircleIcon />}
          onClick={handleOpenReviewModal}
        >
          Make Review
        </Button>
      </div>
      {loadingReviews ?
        <SpinnerOverlay /> :
        !isEmpty(reviews.rows) ?
          reviewsRender() :
          <div className={classes.noReviewMessage}>No Review Found</div>
      }
    </Paper>
)
}

export default Reviews
