import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  AppBar,
  Container,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import * as actions from './../state/actions';
import SpinnerOverlay from '../../../design-system/SpinnerOverlay/SpinnerOverlay';
import { IApplicationState } from '../../../store/roots/rootReducer';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: 'relative'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    '&:hover': {
      opacity: .75,
    },
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: '0.5',
    zIndex: 2
  }
}));

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [showError, setShowError] = useState<boolean>(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const loading: boolean = useSelector((state: IApplicationState) => state.auth.loading)

  const changeValue = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
    setShowError(false);
  }

  useEffect(() => {
    localStorage.removeItem('token');
  }, [])

  const submit = async (event: any) => {
    event.preventDefault();
    dispatch(actions.login(form.email.toLowerCase(), form.password))
  }

  return (
    <>
      <AppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <LogoText /> */}
          <form className={classes.form} noValidate>
            {loading && <div className={classes.overlay}></div>}
            {loading && <SpinnerOverlay />}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={changeValue}
              value={form.email}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  submit(e);
                }
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
              onChange={changeValue}
              value={form.password}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  submit(e);
                }
              }}
            />
            {showError && <div style={{ color: 'red' }}>Usuário ou senha incorretos</div>}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
              disabled={loading}
            >
              Sign In
                </Button>
            <Grid container>
              <Grid item xs>
                {/* <NavLinkStyled variant="body2" to='/forgotpassword'>
                  Esqueceu a senha?
                </NavLinkStyled> */}
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Login
