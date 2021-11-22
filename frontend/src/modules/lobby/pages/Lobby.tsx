import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Dialog
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash';
import Card from '../components/card';
import InfluencersImage from './../assets/Digital-Influencer-paga-imposto.jpg'
import CompaniesImage from './../assets/company.jpeg'
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  cardSelectors: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  spacer: {
    margin: 20
  }
}))

const Lobby: React.FC = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()

  const hadleSelectCard = (type: string) => {
      if (type === 'Creators') {
        history.push('/creators');
      } else if (type === 'Companies') {
        history.push('/company/campaigns');
      }
  }

  // useEffect(() => {
  //   loadWeb3()
  // }, [])

  // const loadWeb3 = async() => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }

  return (
    <>
        <div className={classes.title}>Select your track</div>
        <div className={classes.cardSelectors}>
            <Card
                type="Creators"
                photo={InfluencersImage}
                title="Creators"
                hadleSelectCard={hadleSelectCard}
            ></Card>
            <div className={classes.spacer}></div>
            <Card
                type="Companies"
                photo={CompaniesImage}
                title="Companies"
                hadleSelectCard={hadleSelectCard}
            ></Card>
        </div>
    </>
  )
}

export default Lobby
