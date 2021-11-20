import { ChangeEvent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from './styles';
import { ECampaignTabs } from '../../models/ECampaignTabs';
import React from 'react';

interface Props {
  selectedTab: ECampaignTabs,
  hadleSelectTab: CallableFunction
}

function TabNavigator({selectedTab, hadleSelectTab}: Props) {

  const handleChange = (event: ChangeEvent<{}>, newValue: ECampaignTabs) => {
    hadleSelectTab(newValue);
  };

  return (
    <Container>
      <Tabs
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        variant="fullWidth"
      >
        <Tab label={ECampaignTabs.CAMPAIGNDETAILS} value={ECampaignTabs.CAMPAIGNDETAILS}/>
        <Tab label={ECampaignTabs.SCANINFLUENCERS} value={ECampaignTabs.SCANINFLUENCERS}/>
        <Tab label={ECampaignTabs.SELECTEDINFLUENCERS} value={ECampaignTabs.SELECTEDINFLUENCERS}/>
      </Tabs>
    </Container>
  );
}

export default TabNavigator;