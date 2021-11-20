import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Typography,
  IconButton,
  TextField,
  FormControl,
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'

import { isEmpty } from 'lodash'
import * as actions from '../../state/actions';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICampaign, ICampaignData } from '../../models/ICampaign';

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
}))


const CampaignModal: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [isNewData, setIsNewData] = useState(true);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');


  const [nameError, setNameError] = useState(false);

  const campaignToEdit: ICampaign = useSelector((state: IApplicationState) => state.campaignsList.campaignToEdit)
  const campaignModalLoading: boolean = useSelector((state: IApplicationState) => state.campaignsList.campaignModalLoading)


  useEffect(() => {
    if (isEmpty(campaignToEdit)) {
      setIsNewData(true)
      setName('')
      setCategory('')
      setPhotoUrl('')
    } else {
      setIsNewData(false)
      setName(campaignToEdit.name)
      setCategory(campaignToEdit.category)
      setPhotoUrl(campaignToEdit.photoUrl)
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

    const body: ICampaignData = {
      name,
      category,
      photoUrl
    };

    if (isNewData) {
      dispatch(actions.postCampaign(body))
    } else {
      dispatch(actions.putCampaign(body))
    }

  }

  const handleDeleteCampaign = () => {
    dispatch(actions.deleteCampaign())
  }

  return (
    <form className={classes.modalContainer} onSubmit={handleSubmit}>
      <div className={classes.modalHeader}>
        <Typography variant='h6'>{isNewData ? 'New Campaign' : 'Edit Campaign'}</Typography>
        <IconButton disabled={campaignModalLoading} onClick={() => handleDeleteCampaign()}><DeleteIcon /></IconButton>
      </div>


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
      <FormControl fullWidth margin='normal'>
        <TextField
          label="Category"
          value={category}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCategory(event.target.value)
          }}
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          label="Photo URL"
          value={photoUrl}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhotoUrl(event.target.value)
          }}
        />
      </FormControl>
      <div className={classes.submitContainer}>
        <IconButton disabled={campaignModalLoading} type="submit"><DoneIcon className={classes.submitButton} fontSize='large'/></IconButton>
      </div>
    </form>
  )
}

export default CampaignModal
