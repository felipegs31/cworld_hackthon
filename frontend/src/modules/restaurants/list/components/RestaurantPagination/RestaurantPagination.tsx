import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TablePagination
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../state/actions';
import { IApplicationState } from '../../../../../store/roots/rootReducer';

import { IPayload } from '../../../../../utils/models/IPayload';
import { IRestaurant } from '../../models/IRestaurant';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  pagination: {
    textAlign: 'right',
    marginTop: 20
  }
}))

const RestaurantPagination: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const restaurants: IPayload<IRestaurant[]> = useSelector((state: IApplicationState) => state.restaurantsList.restaurants)
  const limit: number = useSelector((state: IApplicationState) => state.restaurantsList.limit)
  const page: number = useSelector((state: IApplicationState) => state.restaurantsList.page)

  const handleChangePageRestaurant = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(actions.restaurantsListChangePage(value))
  }

  return (
    <div className={classes.pagination}>
      <Pagination count={Math.ceil(restaurants.count/limit)} page={page} onChange={handleChangePageRestaurant} />
    </div>
  )
}

export default RestaurantPagination
