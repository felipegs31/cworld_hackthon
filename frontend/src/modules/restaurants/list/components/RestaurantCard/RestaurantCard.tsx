import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Avatar,
  Typography,
  Paper,
  IconButton,
} from '@material-ui/core/'
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";
import { IRestaurant } from '../../models/IRestaurant';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../state/actions';
import { ERoles } from '../../../../auth/models/ERoles';
import { IUser } from '../../../../auth/models/IUser';
import { IApplicationState } from '../../../../../store/roots/rootReducer';

const useStyles = makeStyles(theme => ({
  paperContainer: {
    position: 'relative',
    '&:hover': {
      boxShadow: '-6px 8px 14px 2px rgba(105,102,102,0.75)',
      cursor: 'pointer'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  topBackground: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: 90,
    borderRadius: '5px 5px 0 0',
  },
  photoContainer: {
      marginTop: 10,
    },
  avatar: {
    width: 150,
    height: 150,
  },
  body: {
    padding: 10
  },
  namesContainer: {
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 20,
    color: 'grey',
    marginBottom: 10
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
}))

interface props {
  restaurant: IRestaurant
}

const RestaurantCard: React.FC<props> = ({ restaurant }: props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()

  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)

  const hadleGoToDetails = () => {
    history.push(`${restaurant.id}`)
  }

  const handleOpenRestaurantModal = (e:any, restaurant: IRestaurant) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    dispatch(actions.openRestaurantModal(restaurant))
  }

  return (
    <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
      <Paper className={classes.paperContainer} onClick={() => hadleGoToDetails()}>
        <div className={classes.container}>
          <div className={classes.topBackground} />
          { user.role === ERoles.Admin && <IconButton className={classes.editButton} onClick={(e) => handleOpenRestaurantModal(e, restaurant)}><EditIcon /></IconButton>}
          <div className={classes.photoContainer}>
            <Avatar src={restaurant.photoUrl} className={classes.avatar} />
          </div>
          <div className={classes.body}>
            <div className={classes.namesContainer}>
              <Typography title={restaurant.name} className={classes.name} variant='h5' noWrap>{restaurant.name}</Typography>
              <Typography title={restaurant.category} className={classes.category} noWrap>{restaurant.category}</Typography>
              <Rating name="read-only" value={restaurant.averageRate} readOnly precision={0.25}/>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  )
}

export default RestaurantCard
