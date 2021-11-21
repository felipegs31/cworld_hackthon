import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../store/roots/rootReducer';

import * as actions from '../state/actions';
import { useDispatch, useSelector } from 'react-redux'
import { ICampaign, ICampaignData } from '../../../campaigns/list/models/ICampaign';
import { ITweet } from '../models/ITweet';
import TweetEmbed from 'react-tweet-embed'
import {
  Typography,
  IconButton,
  TextField,
  FormControl,
  Slider,
  FormLabel
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ChipInput from 'material-ui-chip-input'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: 'center'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}))

const Detail: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const campaign: ICampaign = useSelector((state: IApplicationState) => state.campaignDetail.campaign)

  const [name, setName] = useState('');
  const [queryText, setQueryText] = useState('');
  const [positivity, setPositivity] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');

  const [budget, setBudget] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [goals, setGoals] = useState<string>('')
  
  useEffect(() => {
    setName(campaign.name)
    setQueryText(campaign.queryText)
    setPositivity(campaign.positivity)
    setPhotoUrl(campaign.photoUrl)
    setBudget(campaign.budget)
    setStartDate(campaign.startDate)
    setEndDate(campaign.endDate)
    setFilterTags(campaign.filterTags)
    setGoals(campaign.goals)
  }, [campaign])

  const campaignDetailRequest = () => {
    dispatch(actions.campaignDetailRequest())
  }
  useEffect(() => {
    campaignDetailRequest()
  }, [])

  return (
    <div className={classes.root}>
      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Company Name"
          value={name}
          disabled={true}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <TextField
          label="Campaign Photo URL"
          value={photoUrl}
          disabled={true}
        />
      </FormControl>

      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Budget (CELO DOLLAR)"
          value={budget}
          type="number"
          disabled={true}
          inputProps={{
            maxLength: 13,
            step: "0.001"
          }}
          onChange={() => {}}
        />
      </FormControl>


      <FormControl fullWidth margin='normal'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.modalHeader}>
            <KeyboardDatePicker
              label='Start date'
              value={startDate}
              onChange={() => {}}
              disabled={true}
              format="dd/MM/yyyy"
            />
            <KeyboardDatePicker
              label='End date'
              value={endDate}
              disabled={true}
              onChange={() => {}}
              format="dd/MM/yyyy"
            />
          </div>
        </MuiPickersUtilsProvider>
      </FormControl>

      <FormControl fullWidth>
        <ChipInput
          value={filterTags}
          onAdd={(chip) => {}}
          onDelete={(chip, index) => {}}
          label='Filter Tags'
          disabled={true}

        />
      </FormControl>

      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Minimum positivity"
          value={positivity}
          type="number"
          inputProps={{
            maxLength: 13,
            step: "0.1"
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
          disabled={true}
        />
      </FormControl>

      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Query Text"
          value={queryText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
          disabled={true}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <TextField
          id="standard-multiline-flexible"
          label="Goals"
          multiline
          value={goals}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
          disabled={true}
        />
      </FormControl>
    </div>
  )
}

export default Detail
