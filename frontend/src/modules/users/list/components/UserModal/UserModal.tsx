import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Typography,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import * as actions from './../../state/actions';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { IUser, IUserData } from '../../models/IUser';

const useStyles = makeStyles(theme => ({
  modalContainer: {
    padding: 30,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20
  },
  submitButton: {
    color: 'green'
  },
  ratingContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  rateError: {
    color: '#f44336',
    fontSize: '0.75rem',
    marginTop: 3,
    fontweight: 400
  }
}))



const UserModal: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [isNewData, setIsNewData] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');


  const [nameError, setNameError] = useState(false);


  const userToEdit: IUser = useSelector((state: IApplicationState) => state.usersList.userToEdit)
  const userModalLoading: boolean = useSelector((state: IApplicationState) => state.usersList.userModalLoading)


  useEffect(() => {
    if (isEmpty(userToEdit)) {
      setIsNewData(true)
      setName('')
      setRole('user')
      setEmail('')
    } else {
      setIsNewData(false)
      setName(userToEdit.name)
      setRole(userToEdit.role)
      setEmail(userToEdit.email)
    }
  }, [])


  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if (!name) {
      hasError = true
      setNameError(true)
    }

    if (hasError) {
      return
    }

    const body: IUserData = {
      name,
      role
    };

    if (isNewData) {
      dispatch(actions.postInviteUser({...body, email}))
    } else {
      dispatch(actions.putUser(body))
    }

  }

  const handleDeleteUser = () => {
    dispatch(actions.deleteUser())
  }

  return (
    <form className={classes.modalContainer} onSubmit={handleSubmit}>
      <div className={classes.modalHeader}>
        <Typography variant='h6'>{isNewData ? 'New User' : 'Edit User'}</Typography>
        <IconButton disabled={userModalLoading} onClick={() => handleDeleteUser()}><DeleteIcon /></IconButton>
      </div>

      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
          }}
          disabled={!isNewData}
        />
      </FormControl>
      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Name"
          value={name}
          error={nameError}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
            setNameError(false)
          }}
        />
      </FormControl>
      <FormControl component="fieldset" margin='normal'>
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={role}
            onChange={event => {
              setRole(event.target.value);
            }}
          >
            <FormControlLabel value="admin" control={<Radio/>} label="Admin" />
            <FormControlLabel value="user" control={<Radio/>} label="User" />
          </RadioGroup>
        </FormControl>
      <div className={classes.submitContainer}>
        <IconButton disabled={userModalLoading} type="submit"><DoneIcon className={classes.submitButton} fontSize='large'/></IconButton>
      </div>
    </form>
  )
}

export default UserModal
