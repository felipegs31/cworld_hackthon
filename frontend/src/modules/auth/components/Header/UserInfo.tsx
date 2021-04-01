import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import * as actions from './../../state/actions'
import { useSelector, useDispatch } from 'react-redux'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
	CssBaseline, AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography,
  Menu, Grid, Avatar,
} from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import { NavLink } from 'react-router-dom';



import { IUser } from '../../models/IUser';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuUserContainer: {
      color: '#fff',
      textAlign: 'left',
      fontSize: 12,
      textTransform: 'capitalize',
    },
    avatarSmall: {
      width: 45,
      height: 45,
      cursor: 'pointer',
    },
    buttonContainer: {
      position: 'absolute',
      right: '10px',
    },
    menuUserLabelContainer: {
      marginRight: 10,
    },
    nameLabel: {
      fontSize: '1rem'
    },
    navLink: {
      color: '#333',
      textDecoration: 'none'
    }
  }),
);

const UserInfo: React.FC = () => {
  const classes = useStyles();
  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
    <div className={classes.buttonContainer}>
      <Button className={classes.menuUserContainer} onClick={handleClickMenu}>
          <div className={classes.menuUserLabelContainer}>
            <span className={classes.nameLabel}>{user.name.split(' ')[0]}</span>
          </div>
          <Avatar className={classes.avatarSmall} alt="Avatar" src={user.picture} />
      </Button>
    </div>
    <Menu
      style={{ marginTop: '50px', padding: '10px' }}
      id="menu"
      keepMounted
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Grid container justify="center" spacing={2} style={{ padding: '10px 15px' }}>
        <Grid item>
          <Avatar className={classes.avatarSmall} alt="Avatar" src={user.picture} />
        </Grid>
        <Grid item style={{ minWidth: '200px', maxWidth: '300px' }}>
          <Typography>{user.name}</Typography>
          <Typography style={{ color: 'grey' }}>{user.role}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <List>
        <NavLink className={classes.navLink} to={"/minha-conta"} onClick={handleClose}>
          <ListItem
            button>
            <ListItemIcon><FaceIcon /></ListItemIcon>
            <ListItemText
              primary={'My Account'} />
          </ListItem>
        </NavLink>
        <NavLink className={classes.navLink} to={"/login"} onClick={handleClose}>
          <ListItem button>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </NavLink>
      </List>
    </Menu>
    </>
  );
}


export default UserInfo
