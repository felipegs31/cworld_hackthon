import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Dialog
} from '@material-ui/core/'
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header/Header'
import { ICampaign, ICampaignData } from '../../../campaigns/list/models/ICampaign';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneIcon from '@material-ui/icons/Done';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import TabNavigator from '../components/tab';
import { ECampaignTabs } from '../models/ECampaignTabs';
import ScanInfluencers from './ScanInfluencers';
import SelectedInfluencers from './SelectedInfluencers';
import Detail from './Detail';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}))

const CampaignDetail: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const campaign: ICampaign = useSelector((state: IApplicationState) => state.campaignDetail.campaign)
  const selectedTab = useSelector((state: IApplicationState) => state.campaignDetail.tab)


  const [value, setValue] = React.useState(0);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const hadleSelectTab = (newTab: ECampaignTabs) => {
    dispatch(actions.setTabCampaign(newTab))
  }

  return (
    <div className={classes.root}>

      <Paper className={classes.root}>
        <TabNavigator selectedTab={selectedTab} hadleSelectTab={hadleSelectTab} />
      
        {selectedTab === ECampaignTabs.CAMPAIGNDETAILS &&
          <Detail />
        }

        {selectedTab === ECampaignTabs.SCANINFLUENCERS &&
          <ScanInfluencers />
        }

        {selectedTab === ECampaignTabs.SELECTEDINFLUENCERS &&
          <SelectedInfluencers />
        }
      </Paper>

    </div>
  )
}

export default CampaignDetail
