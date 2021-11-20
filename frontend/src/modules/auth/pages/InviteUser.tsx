import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './../state/actions';

import {
  Container,
  Button,
  CssBaseline,
  Grid,
  Typography,
  CircularProgress,
  AppBar,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

import { IApplicationState } from '../../../store/roots/rootReducer';
import { IUserData } from '../../users/list/models/IUser';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: 24,
  },
  submit: {
    marginTop: 24,
    '&:hover': {
      opacity: .75
    },
  },
  appbar: {
    height: 64
  },
  navlink: {
    color: '#333',
    textDecoration: 'none'
  },
}));


const InviteUser: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const loading: boolean = useSelector((state: IApplicationState) => state.auth.loading)
  const getInviteUserError: boolean = useSelector((state: IApplicationState) => state.auth.getInviteUserError)
  const inviteUser: IUserData = useSelector((state: IApplicationState) => state.auth.inviteUser)


  useEffect(() => {
    dispatch(actions.getInviteUser())
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if (!validPassword()) {
      hasError = true;
    }

    if (hasError) return;

    dispatch(actions.createAccountInviteUser(password))
  }

  const validPassword = () => {
    if (password.length < 6) {
      setPasswordError(true)
      return false;
    }
    return true;
  }


  return (
    <>
      <AppBar className={classes.appbar}/>
      <Container component="main" maxWidth="xs" style={{ marginBottom: '100px' }}>
        <CssBaseline />
        {(!getInviteUserError && !isEmpty(inviteUser)) && (
          <div className={classes.paper}>
            <Typography variant="h2" gutterBottom>
              Food Corner
            </Typography>
            <Typography variant="h5" gutterBottom>
              Hello, { inviteUser.name }, to create your account, type your password
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    helperText={'More than 6 characters'}
                    error={passwordError}
                    onChange={event => {
                      setPassword(event.target.value)
                      setPasswordError(false)
                    }}
                    onBlur={validPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
                startIcon={loading && <CircularProgress />}
              >
                CREATE ACCOUNT
              </Button>
            </form>
          </div>)}
          {getInviteUserError && (
          <div className={classes.paper}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
              <ErrorIcon style={{ height: "100px", width: "100px", color: "red" }} />
              <div style={{ fontSize: "25px", fontWeight: 'bold', textAlign: "center" }}>Invalid Link</div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default InviteUser
