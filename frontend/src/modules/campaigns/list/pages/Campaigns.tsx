import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';
import {
  Grid,
  Dialog
} from '@material-ui/core/'
import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import { IPayload } from '../../../../utils/models/IPayload';
import CampaignCard from '../components/CampaignCard/CampaignCard';
import { ICampaign } from '../models/ICampaign';
import CampaignModal from '../components/CampaignModal/CampaignModal';
import CampaignActionBar from '../components/CampaignActionBar/CampaignActionsBar';
import SpinnerOverlay from '../../../../design-system/SpinnerOverlay/SpinnerOverlay';
import { isEmpty } from 'lodash';
import CampaignPagination from '../components/CampaignPagination/CampaignPagination';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  container: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: '0.5',
    zIndex: 2
  },
  noReviewMessage: {
    color: '#d1d7dc',
    marginTop: 30,
    fontSize: '2rem',
    textAlign: 'center'
  }
}))

const Campaigns: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const campaigns: IPayload<ICampaign[]> = useSelector((state: IApplicationState) => state.campaignsList.campaigns)
  const campaignModalOpen: boolean = useSelector((state: IApplicationState) => state.campaignsList.campaignModalOpen)
  const loading: boolean = useSelector((state: IApplicationState) => state.campaignsList.loading)

  const campaignsListRequest = () => {
    dispatch(actions.campaignsListRequest())
  }

  useEffect(() => {
    campaignsListRequest()
  }, [])

  const handleCloseCampaignModal = () => {
    dispatch(actions.closeCampaignModal())
  }



  return (
    <>
      <div className={classes.root}>
        <CampaignActionBar />
        <div className={classes.container}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {loading && <div className={classes.overlay}></div>}
            {loading && <SpinnerOverlay />}
            {campaigns.rows.map(campaign => <CampaignCard campaign={campaign} key={campaign.id} />)}
          </Grid>
        </div>
        {!isEmpty(campaigns.rows) && <CampaignPagination />}
        {(isEmpty(campaigns.rows) && !loading) && <div className={classes.noReviewMessage}>No Campaign Found</div>}
      </div>

      <Dialog
        scroll='body'
        fullWidth
        open={campaignModalOpen}
        onClose={() => handleCloseCampaignModal()}
      >
        <CampaignModal />
      </Dialog>
    </>
  )
}

export default Campaigns
