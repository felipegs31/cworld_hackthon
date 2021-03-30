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
import { IPayload } from '../../../../utils/models/IPayload';
import RestaurantCard from '../components/RestaurantCard';
import { IRestaurant } from '../models/IRestaurant';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2)
  }
}))

const Restaurants: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const restaurants: IPayload<IRestaurant[]> = useSelector((state: IApplicationState) => state.restaurantsList.restaurants)

  const restaurantsListRequest = () => {
    dispatch(actions.restaurantsListRequest())
  }

  useEffect(() => {
    restaurantsListRequest()
  }, [])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {restaurants.rows.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id}/>)}
      </Grid>
    </div>
)
}

export default Restaurants
