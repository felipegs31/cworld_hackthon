import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import PeopleIcon from '@material-ui/icons/People'
import { useSelector, useDispatch } from 'react-redux'
import { IApplicationState } from '../../../../store/roots/rootReducer'
import * as actions from './../../state/actions'
import { NavLink } from 'react-router-dom';
import { ERoles } from '../../models/ERoles'
import { IUser } from '../../models/IUser'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    navlink: {
      color: '#333',
      textDecoration: 'none',
    },
  })
);

export default function Navigation() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const drawerOpen: boolean = useSelector((state: IApplicationState) => state.auth.drawerOpen)
  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)


  const handleToggleDrawer = () => {
    dispatch(actions.toggleDrawer())
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={drawerOpen || false}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <NavLink className={classes.navlink} to={"/"}>
          <ListItem button>
            <ListItemIcon><RestaurantIcon /></ListItemIcon>
            <ListItemText primary="Campaigns" />
          </ListItem>
        </NavLink>
        {user.role === ERoles.Admin && <NavLink className={classes.navlink} to={"/users"}>
          <ListItem button>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </NavLink> }
      </List>
      <Divider />
    </Drawer>
  );
}
