import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './../state/actions';

import {
  Container, Avatar, Button, CssBaseline,
  TextField, Radio, RadioGroup,
  FormControlLabel, FormLabel,
  Checkbox, Link, Grid, Box, Typography, CircularProgress, AppBar,
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


const CreateAccount: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const loading: boolean = useSelector((state: IApplicationState) => state.auth.loading)
  const resetPasswordSent: boolean = useSelector((state: IApplicationState) => state.auth.resetPasswordSent)


  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if(!name){
      hasError = true;
      setNameError(true)
    }

    if (!emailValidator(email)) {
      setEmailError(true)
      hasError = true;
    }

    if (!validPassword()) {
      hasError = true;
    }

    if (hasError) return;

    dispatch(actions.createAccount(name, email, password))
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
        {!resetPasswordSent && (
          <div className={classes.paper}>
            <Typography variant="h2" gutterBottom>
              Food Corner
            </Typography>
            <Typography variant="h5" gutterBottom>
              Create New Account
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                required
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                error={nameError}
                onChange={event => {
                  setName(event.target.value)
                  setNameError(false)
                }}
              />
              <TextField
                variant="outlined"
                required
                margin="normal"
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => {
                  setPassword(event.target.value)
                  setPasswordError(false)
                }}
                helperText={'More than 6 characters'}
                value={password}
                error={passwordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
                startIcon={loading && <CircularProgress />}
              >
                Create Account
          </Button>
            </form>
          </div>)}
        {/* {resetPasswordSent && (
          <div className={classes.paper}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
              <Email style={{ height: "100px", width: "100px", color: "gray" }} />
              <div style={{ fontSize: "25px", fontWeight: 'bold', textAlign: "center" }}>Link sent to your email</div>
              <div style={{ fontSize: "15px", color: "#333", minWidth: "450px", marginTop: "30px", textAlign: "center" }}>Link sent to <b>{email}</b></div>
            </div>
          </div>
        )} */}
      </Container>
    </>
  );
}

export default CreateAccount
