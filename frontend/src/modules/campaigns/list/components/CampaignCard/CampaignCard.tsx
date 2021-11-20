import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Avatar,
  Typography,
  Paper,
  IconButton,
} from '@material-ui/core/'
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";
import { ICampaign } from '../../models/ICampaign';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../state/actions';
import { ERoles } from '../../../../auth/models/ERoles';
import { IUser } from '../../../../auth/models/IUser';
import { IApplicationState } from '../../../../../store/roots/rootReducer';

const useStyles = makeStyles(theme => ({
  paperContainer: {
    position: 'relative',
    '&:hover': {
      boxShadow: '-6px 8px 14px 2px rgba(105,102,102,0.75)',
      cursor: 'pointer'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  topBackground: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: 90,
    borderRadius: '5px 5px 0 0',
  },
  photoContainer: {
      marginTop: 10,
    },
  avatar: {
    width: 150,
    height: 150,
  },
  body: {
    padding: 10
  },
  namesContainer: {
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 20,
    color: 'grey',
    marginBottom: 10
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
}))

interface props {
  campaign: ICampaign
}

const CampaignCard: React.FC<props> = ({ campaign }: props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()

  const user: IUser = useSelector((state: IApplicationState) => state.auth.user)

  const hadleGoToDetails = () => {
    dispatch(actions.openCampaignDetails(campaign))
    history.push(`/company/campaigns/${campaign.id}`)
  }

  const handleOpenCampaignModal = (e:any, campaign: ICampaign) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    dispatch(actions.openCampaignModal(campaign))
  }

  return (
    <Grid item xs={12} sm={6} md={4} key={campaign.id}>
      <Paper className={classes.paperContainer} onClick={() => hadleGoToDetails()}>
        <div className={classes.container}>
          <div className={classes.topBackground} />
          { user.role === ERoles.Admin && <IconButton className={classes.editButton} onClick={(e) => handleOpenCampaignModal(e, campaign)}><EditIcon /></IconButton>}
          <div className={classes.photoContainer}>
            <Avatar src={campaign.photoUrl} className={classes.avatar} />
          </div>
          <div className={classes.body}>
            <div className={classes.namesContainer}>
              <Typography title={campaign.name} className={classes.name} variant='h5' noWrap>{campaign.name}</Typography>
              {/* <Typography title={campaign.category} className={classes.category} noWrap>{campaign.category}</Typography> */}
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  )
}

export default CampaignCard
