import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputBase,
  Button
} from '@material-ui/core/'
import { useHistory } from "react-router-dom";
import { IRestaurant } from '../../models/IRestaurant';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../state/actions';
import { ERoles } from '../../../../auth/models/ERoles';
import { IUser } from '../../../../auth/models/IUser';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import { useDebounce } from 'use-debounce/lib';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  searchRow: {
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '2px 4px',
    borderRadius: '5px',
  },
  searchIcon: {
    color: '#ccc'
  },
  search: {
    flex: 1,
    marginLeft: '8px',
	},
  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 30
  }
}))


const RestaurantActionBar: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 500);
  const [isFirstSearch, setIsFirstSearch] = useState(true);



  const searchText: string = useSelector((state: IApplicationState) => state.restaurantsList.searchText)
  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)

  useEffect(() => {
    if (!isFirstSearch) {
      dispatch(actions.restaurantsListChangeSearchText(value))
    }
    setIsFirstSearch(false)
  }, [value])

  useEffect(() => {
    setText(searchText)
  }, [])

  const handleOpenRestaurantModal = () => {
    dispatch(actions.openRestaurantModal())
  }

  return (
    <div className={classes.actionRow}>
      <div className={classes.searchRow}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase
          className={classes.search}
          placeholder="Search Restaurants"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      {user.role === ERoles.Admin && <Button
        variant="contained"
        color="primary"
        endIcon={<AddCircleIcon />}
        onClick={handleOpenRestaurantModal}
      >
        Add Restaurant
      </Button>}
    </div>
  )
}

export default RestaurantActionBar
