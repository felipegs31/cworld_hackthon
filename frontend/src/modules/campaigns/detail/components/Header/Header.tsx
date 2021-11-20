import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Typography,
  IconButton,
  Avatar
} from '@material-ui/core/'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import {
  ArrowBack,
} from '@material-ui/icons';
import { ICampaign } from '../../models/ICampaign';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30
  },
  avatar: {
    width: '2.75rem',
    height: '2.75rem',
    marginRight: 10
  },
}))

const Header: React.FC = () => {
  let history = useHistory()
  const classes = useStyles()

  const restaurant: ICampaign = useSelector((state: IApplicationState) => state.campaignDetail.campaign)

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className={classes.container}>
      <IconButton onClick={handleBack}><ArrowBack /></IconButton>
      <Avatar src={restaurant.photoUrl} className={classes.avatar} />
      <Typography variant="h4">{restaurant.name}</Typography>
    </div>
)
}

export default Header
