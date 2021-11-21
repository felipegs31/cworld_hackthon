import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IApplicationState } from '../../../../../store/roots/rootReducer';
import {
  Typography,
  IconButton,
  TextField,
  FormControl,
  Slider,
  FormLabel
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../state/actions';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICampaign, ICampaignData } from '../../models/ICampaign';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ChipInput from 'material-ui-chip-input'
import { isEmpty, cloneDeep } from 'lodash';

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
  datePickers: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}))


const CampaignModal: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [isNewData, setIsNewData] = useState(true);
  const [name, setName] = useState('');
  const [queryText, setQueryText] = useState('');
  const [positivity, setPositivity] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');

  const [budget, setBudget] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [goals, setGoals] = useState<string>('')


  const [ageRange, setAgeRange] = useState<number[]>([18, 60]);



  const [nameError, setNameError] = useState(false);
  const [queryTextError, setQueryTextError] = useState(false);
  const [positivityError, setPositivityError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [filterTagsError, setFilterTagsError] = useState(false);

  const campaignToEdit: ICampaign = useSelector((state: IApplicationState) => state.campaignsList.campaignToEdit)
  const campaignModalLoading: boolean = useSelector((state: IApplicationState) => state.campaignsList.campaignModalLoading)


  useEffect(() => {
    if (isEmpty(campaignToEdit)) {
      setIsNewData(true)
      setName('')
      setQueryText('')
      setPositivity(90)
      setPhotoUrl('')
      setBudget(0)
      setAgeRange([18, 60])
      setStartDate(null)
      setEndDate(null)
      setFilterTags([])
      setGoals('')
    } else {
      setIsNewData(false)
      setName(campaignToEdit.name)
      setQueryText(campaignToEdit.queryText)
      setPositivity(campaignToEdit.positivity)
      setPhotoUrl(campaignToEdit.photoUrl)
      setBudget(campaignToEdit.budget)
      setAgeRange(campaignToEdit.ageRange)
      setStartDate(campaignToEdit.startDate)
      setEndDate(campaignToEdit.endDate)
      setFilterTags(campaignToEdit.filterTags)
      setGoals(campaignToEdit.goals)
    }
  }, [])


  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hasError = false;

    if (!name) {
      hasError = true
      setNameError(true)
    }

    if (!startDate) {
      hasError = true
      setStartDateError(true)
    }

    if (!endDate) {
      hasError = true
      setEndDateError(true)
    }

    if (!filterTags || filterTags.length === 0) {
      hasError = true
      setFilterTagsError(true)
    }

    if (hasError) {
      return
    }

    if (!positivity) {
      hasError = true
      setPositivityError(true)
    }

    if (!queryText) {
      hasError = true
      setQueryTextError(true)
    }


    const body: ICampaignData = {
      queryText,
      name,
      photoUrl,
      budget,
      ageRange,
      startDate,
      endDate,
      filterTags,
      goals,
      positivity
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

  const handleAgeRangeChange = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  function ageRangeValuetext(value: number) {
    return `${value} years`;
  }

  const handleAddChip = (chip: string) => {
    let filterTagsClone = cloneDeep(filterTags) as string[]
    filterTagsClone.push(chip);
    setFilterTags(filterTagsClone)
    setFilterTagsError(false)
  }

  const handleDeleteChip = (chip: string, index: number) => {
    let filterTagsClone = cloneDeep(filterTags)
    filterTagsClone.splice(index, 1);
    setFilterTags(filterTagsClone)
  }

  return (
    <form className={classes.modalContainer} onSubmit={handleSubmit}>
      <div className={classes.modalHeader}>
        <Typography variant='h6'>{isNewData ? 'New Campaign' : 'Edit Campaign'}</Typography>
        {/* <IconButton disabled={campaignModalLoading} onClick={() => handleDeleteCampaign()}><DeleteIcon /></IconButton> */}
      </div>


      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Company Name"
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
          label="Campaign Photo URL"
          value={photoUrl}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhotoUrl(event.target.value)
          }}
        />
      </FormControl>

      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Budget (CELO DOLLAR)"
          value={budget}
          type="number"
          inputProps={{
            maxLength: 13,
            step: "0.001"
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setBudget(Number(event.target.value))
          }}
        />
      </FormControl>


      <FormControl fullWidth margin='normal'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.modalHeader}>
            <KeyboardDatePicker
              label='Start date'
              value={startDate}
              onChange={date => {
                setStartDate(date)
                setStartDateError(false)
              }}
              format="dd/MM/yyyy"
              error={startDateError}
            />
            <KeyboardDatePicker
              label='End date'
              value={endDate}
              onChange={date => {
                setEndDate(date)
                setEndDateError(false)
              }}
              format="dd/MM/yyyy"
              error={endDateError}
            />
          </div>
        </MuiPickersUtilsProvider>
      </FormControl>


      <FormControl fullWidth margin='normal' required>
        <FormLabel htmlFor="age-range">Age Range</FormLabel>
        <Slider
          id="age-range"
          value={ageRange}
          onChange={handleAgeRangeChange}
          valueLabelDisplay="auto"
          getAriaValueText={ageRangeValuetext}
        />
      </FormControl>

      <FormControl fullWidth>
        <ChipInput
          value={filterTags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
          label='Filter Tags'
          error={filterTagsError}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPositivity(Number(event.target.value))
          }}
        />
      </FormControl>

      <FormControl fullWidth margin='normal' required>
        <TextField
          label="Query Text"
          value={queryText}
          error={queryTextError}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setQueryText(event.target.value)
            setQueryTextError(false)
          }}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <TextField
          id="standard-multiline-flexible"
          label="Goals"
          multiline
          value={goals}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setGoals(event.target.value)
          }}
        />
      </FormControl>

      <div className={classes.submitContainer}>
        <IconButton disabled={campaignModalLoading} type="submit"><DoneIcon className={classes.submitButton} fontSize='large' /></IconButton>
      </div>
    </form>
  )
}

export default CampaignModal
