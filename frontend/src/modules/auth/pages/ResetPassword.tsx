import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './../state/actions';

import {
  Container, Button, CssBaseline,
  TextField,
  Grid, Typography, CircularProgress, AppBar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Email from "@material-ui/icons/EmailOutlined";


import { IApplicationState } from '../../../store/roots/rootReducer';
import { emailValidator } from '../../../utils/emailValidator';

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
  }
}));


const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState(false);

  const loading: boolean = useSelector((state: IApplicationState) => state.auth.loading)
  const resetPasswordSent: boolean = useSelector((state: IApplicationState) => state.auth.resetPasswordSent)


  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if (!emailValidator(email)) {
      setEmailError(true)
      hasError = true;
    }

    if (hasError) return;

    dispatch(actions.postResetPassword(email))
  }

  useEffect(() => {
    dispatch(actions.setResetPasswordSent())
  }, [])

  return (
    <>
      <AppBar className={classes.appbar}/>
      <Container component="main" maxWidth="xs" style={{ marginBottom: '100px' }}>
        <CssBaseline />
        {!resetPasswordSent && (
          <div className={classes.paper}>
            <Typography variant="h2" gutterBottom>
              Food Corner
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    error={emailError}
                    onChange={event => {
                      setEmail(event.target.value.toLowerCase())
                      setEmailError(false)
                    }}
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
                Reset Password
          </Button>

            </form>
          </div>)}
        {resetPasswordSent && (
          <div className={classes.paper}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
              <Email style={{ height: "100px", width: "100px", color: "gray" }} />
              <div style={{ fontSize: "25px", fontWeight: 'bold', textAlign: "center" }}>Link sent to your email</div>
              <div style={{ fontSize: "15px", color: "#333", minWidth: "450px", marginTop: "30px", textAlign: "center" }}>Link sent to <b>{email}</b></div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default ResetPassword
