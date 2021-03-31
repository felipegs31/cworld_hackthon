import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Typography,
  IconButton,
  Avatar,
  Paper,
  LinearProgress,
  Grid,
  Modal,
  TextField,
  FormControl
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import { IRestaurant } from '../../models/IRestaurant';
import { isEmpty } from 'lodash'
import { IReview, IReviewData } from '../../models/IReviews';
import * as actions from './../../state/actions';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DoneIcon from '@material-ui/icons/Done';
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles(theme => ({
  modalContainer: {
    padding: 30,
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20
  },
  submitButton: {
    color: 'green'
  },
  ratingContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  rateError: {
    color: '#f44336',
    fontSize: '0.75rem',
    marginTop: 3,
    fontweight: 400
  }
}))



const ReviewModal: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [isNewData, setIsNewData] = useState(true);
  const [visitDate, setVisitDate] = useState(new Date());
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState<number | null>(0);

  const [commentError, setCommentError] = useState(false);
  const [rateError, setRateError] = useState(false);


  const reviewToEdit: IReview = useSelector((state: IApplicationState) => state.restaurantDetail.reviewToEdit)


  useEffect(() => {
    if (isEmpty(reviewToEdit)) {
      setIsNewData(true)
      setVisitDate(new Date())
      setComment('')
      setRate(0)
    } else {
      setIsNewData(false)
      setVisitDate(reviewToEdit.visitDate)
      setComment(reviewToEdit.comment)
      setRate(reviewToEdit.rate)
    }
  }, [])


  const handleDateChange = (date: any)  => {
    setVisitDate(date)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if (!comment || comment.length < 20) {
      hasError = true
      setCommentError(true)
    }

    if (rate === 0) {
      hasError = true
      setRateError(true)
    }

    if (hasError) {
      return
    }

    const body: IReviewData = {
      comment,
      rate,
      visitDate
    };

    if (isNewData) {
      console.log('POST')
      console.log('body', body)
      dispatch(actions.postReview(body))
    } else {
      console.log('UPDATE')
      console.log('body', body)
      dispatch(actions.putReview(body))
    }

  }


  return (
    <form className={classes.modalContainer} onSubmit={handleSubmit}>
      <Typography variant='h6'>{isNewData ? 'New Review' : 'Edit Review'}</Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required
          label='Visit date'
          margin='normal'
          value={visitDate}
          onChange={handleDateChange}
          format="MM/dd/yyyy"
          disableFuture={true}
        />
      </MuiPickersUtilsProvider>
      <div className={classes.ratingContainer}>
        <div>
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue)
              setRateError(false)
            }}
          />
        </div>
        {rateError && <span className={classes.rateError}>Rate is required</span>}
      </div>
      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Comment"
          multiline
          value={comment}
          error={commentError}
          helperText="Type at least 20 characters"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setComment(event.target.value)
            setCommentError(false)
          }}
        />
      </FormControl>
      <div className={classes.submitContainer}>
        <IconButton type="submit"><DoneIcon className={classes.submitButton} fontSize='large'/></IconButton>
      </div>
    </form>
  )
}

export default ReviewModal
