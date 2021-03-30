import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader
} from '@material-ui/core/'
import * as actions from './../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import {
  useParams
} from "react-router-dom";
import Header from './../components/Header/Header'
import Ratings from './../components/Ratings/Ratings'

import { IRestaurant } from '../models/IRestaurant';
import Reviews from '../components/Reviews/Reviews';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2)
  }
}))

const Restaurant: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>();

  const restaurant: IRestaurant = useSelector((state: IApplicationState) => state.restaurantDetail.restaurant)

  const restaurantDetailRequest = (id: string) => {
    dispatch(actions.restaurantDetailRequest(id))
  }

  const reviewsRequest = (id: string) => {
    dispatch(actions.reviewsRequest(id))
  }

  const reviewHighestRequest = (id: string) => {
    dispatch(actions.reviewHighestRequest(id))
  }

  const reviewLowestRequest = (id: string) => {
    dispatch(actions.reviewLowestRequest(id))
  }

  useEffect(() => {
    restaurantDetailRequest(id)
    reviewsRequest(id)
    reviewHighestRequest(id)
    reviewLowestRequest(id)
  }, [id])

  return (
    <div className={classes.root}>
      <Header />
      <Ratings />
      {/* <HightlightReview /> */}
      <Reviews />
    </div>
)
}

export default Restaurant
