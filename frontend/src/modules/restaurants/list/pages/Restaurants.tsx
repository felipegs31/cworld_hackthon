import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Grid,
  Dialog
} from '@material-ui/core/'
import * as actions from './../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import { IPayload } from '../../../../utils/models/IPayload';
import RestaurantCard from '../components//RestaurantCard/RestaurantCard';
import { IRestaurant } from '../models/IRestaurant';
import RestaurantModal from '../components/RestaurantModal/RestaurantModal';
import RestaurantActionBar from '../components/RestaurantActionBar/RestaurantActionsBar';
import SpinnerOverlay from '../../../../design-system/SpinnerOverlay/SpinnerOverlay';
import { isEmpty } from 'lodash';
import RestaurantPagination from '../components/RestaurantPagination/RestaurantPagination';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  container: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: '0.5',
    zIndex: 2
  },
  noReviewMessage: {
    color: '#d1d7dc',
    marginTop: 30,
    fontSize: '2rem',
    textAlign: 'center'
  }
}))

const Restaurants: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const restaurants: IPayload<IRestaurant[]> = useSelector((state: IApplicationState) => state.restaurantsList.restaurants)
  const restaurantModalOpen: boolean = useSelector((state: IApplicationState) => state.restaurantsList.restaurantModalOpen)
  const loading: boolean = useSelector((state: IApplicationState) => state.restaurantsList.loading)

  const restaurantsListRequest = () => {
    dispatch(actions.restaurantsListRequest())
  }

  useEffect(() => {
    restaurantsListRequest()
  }, [])

  const handleCloseRestaurantModal = () => {
    dispatch(actions.closeRestaurantModal())
  }



  return (
    <>
      <div className={classes.root}>
        <RestaurantActionBar />
        <div className={classes.container}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {loading && <div className={classes.overlay}></div>}
            {loading && <SpinnerOverlay />}
            {restaurants.rows.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id}/>)}
          </Grid>
        </div>
        {!isEmpty(restaurants.rows) && <RestaurantPagination />}
        {(isEmpty(restaurants.rows) && !loading) && <div className={classes.noReviewMessage}>No Restaurant Found</div>}
      </div>

      <Dialog
        scroll='body'
        fullWidth
        open={restaurantModalOpen}
        onClose={() => handleCloseRestaurantModal()}
      >
        <RestaurantModal/>
      </Dialog>
    </>
  )
}

export default Restaurants
