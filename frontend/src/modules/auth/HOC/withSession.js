import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './../state/actions'
import Login from '../pages/Login'
import { LinearProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    linearProgressContent: {
      width: '100%'
    }
  })
);

const withSession = Component => props => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const tokenStorage = localStorage.getItem('token')
    const tokenState = useSelector(state => state.auth.token)

    const token = tokenStorage || tokenState

    const name = useSelector(state => state.auth.user.name)

    if (token && name) {
        return <Component {...props}/>
    } else if (token) {
        dispatch(actions.getMe())
        return (
          <div className={classes.linearProgressContent}>
            <LinearProgress />
          </div>
        )
    } else {
        return <Login />
    }
}



export default withSession
