import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Paper
} from '@material-ui/core/'
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";
import { IRestaurant } from '../models/IRestaurant';

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
  }
}))

interface props {
  restaurant: IRestaurant
}

const RestaurantCard: React.FC<props> = ({ restaurant }: props) => {
  const classes = useStyles()
  let history = useHistory();

  const hadleGoToDetails = () => {
    history.push(`${restaurant.id}`);
  }

  return (
    <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
      <Paper className={classes.paperContainer} onClick={() => hadleGoToDetails()}>
        <div className={classes.container}>
          <div className={classes.topBackground} />
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
