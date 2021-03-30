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
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import { IRestaurant } from '../../models/IRestaurant';
import { isEmpty } from 'lodash'
import { IRatesPercent } from '../../models/IRatesPercent';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 30
  },
  averageRate: {
    color: "#b4690e",
    fontSize: "4rem",
    fontWeight: 'bold'
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  linearProgressContainer: {
    marginRight: 10,
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  percent: {
   marginLeft: 10,
   width: 50
  },
  rating: {
    color: "#e5981",
  },
  colorPrimary: {
    backgroundColor: "#e5981"
  }
}))

const BorderLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: 8,
      borderRadius: 1,
      width: '70%',
      marginRight: 20
    },
    colorPrimary: {
      backgroundColor: "#d1d7dc"
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#6a6f73',
    },
  }),
)(LinearProgress);

const Ratings: React.FC = () => {
  let history = useHistory()
  const classes = useStyles()

  const restaurant: IRestaurant = useSelector((state: IApplicationState) => state.restaurantDetail.restaurant)
  const ratesPercent: IRatesPercent[] = useSelector((state: IApplicationState) => state.restaurantDetail.ratesPercent)



  return (
    <Paper className={classes.container}>
      <Grid container spacing={3}>
        {!isEmpty(restaurant) && <>
          <Grid item xs={12} sm={4} md={3} className={classes.root}>
            <div className={classes.averageRate}>{restaurant.averageRate}</div>
            <Rating className={classes.rating} value={restaurant.averageRate} readOnly precision={0.25}/>
          </Grid>
          <Grid item xs={12} sm={8} md={9} className={classes.root}>
            {ratesPercent.map((percent, index) => (
              <div className={classes.linearProgressContainer} key={index}>
                <BorderLinearProgress
                  variant="determinate" value={percent.percent}/>
                <Rating className={classes.rating} value={percent.stars} readOnly precision={0.25}/>
                <span className={classes.percent}>{percent.percent}%</span>
              </div>
            ))}
          </Grid>
        </>}
      </Grid>
    </Paper>
)
}

export default Ratings
