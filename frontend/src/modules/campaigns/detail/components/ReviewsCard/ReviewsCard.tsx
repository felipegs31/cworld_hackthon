import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Avatar,
} from '@material-ui/core/'
import { useDispatch } from 'react-redux'
import Rating from '@material-ui/lab/Rating';
import { IReview } from '../../models/IReviews';
import EditIcon from '@material-ui/icons/Edit';
import * as actions from '../../state/actions';

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
  }

  return (
    <div className={classes.container}>
      <div>
        <Avatar src={review.user.picture} className={classes.avatar} />
        {review.editable && <IconButton onClick={() => handleOpenReviewModal(review)}><EditIcon /></IconButton>}
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
