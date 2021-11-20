import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Dialog
} from '@material-ui/core/'
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header/Header'
import Ratings from '../components/Ratings/Ratings'
import { ICampaign, ICampaignData } from '../../../campaigns/list/models/ICampaign';
import Reviews from '../components/Reviews/Reviews';
import HightlightReview from '../components/HightlightReview/HightlightReview';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneIcon from '@material-ui/icons/Done';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}))

const Restaurant: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const campaign: ICampaign = useSelector((state: IApplicationState) => state.campaignsList.campaign)

  const [value, setValue] = React.useState(0);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  console.log("chegou: ", campaign)
  const restaurantDetailRequest = () => {
    dispatch(actions.restaurantDetailRequest())
  }

  const reviewsRequest = () => {
    dispatch(actions.reviewsRequest())
  }

  const reviewHighestRequest = () => {
    dispatch(actions.reviewHighestRequest())
  }

  const reviewLowestRequest = () => {
    dispatch(actions.reviewLowestRequest())
  }

  const handleCloseReviewModal = () => {
    dispatch(actions.closeReviewModal())
  }

  useEffect(() => {
    restaurantDetailRequest()
    reviewsRequest()
    reviewHighestRequest()
    reviewLowestRequest()
  }, [])

  return (
    <div className={classes.root}>

      <Paper className={classes.root}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab icon={<DescriptionIcon />} label="Campaign details" />
          <Tab icon={<QuestionAnswerIcon />} label="Scan influencers" />
          <Tab icon={<DoneIcon />} label="Selected influencers" />
        </Tabs>
      </Paper>
      {/* <Header />
      <Ratings />
      <HightlightReview />
      <Reviews /> */}
    </div>
  )
}

export default Restaurant
