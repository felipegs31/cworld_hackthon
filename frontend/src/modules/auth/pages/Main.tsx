import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './../components/Navigation/Navigation'
import Header from '../components/Header/Header';
import { IApplicationState } from '../../../store/roots/rootReducer';
import { useSelector } from 'react-redux'
import withSession from '../HOC/withSession';
import { IUser } from '../models/IUser';
import { ERoles } from '../models/ERoles';
import PrivateRoutes from '../../../PrivateRoutes';
import { Container } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      paddingTop: 80
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const Main: React.FC = () => {
  const classes = useStyles();
  const drawerOpen: boolean = useSelector((state: IApplicationState) => state.auth.drawerOpen)
  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Navigation />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <Container maxWidth='md'>
          <PrivateRoutes />
        </Container>
      </main>
    </div>
  );
}

export default withSession(Main)
