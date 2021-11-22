import { success, notFound } from '../../services/response/'
import { Rewards } from '.'
import twit from 'twit'
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')

const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

export const getAccount = async () => {
  const web3 = new Web3()
  return await web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_CELO_KEY)
}

export const send = async (reward, user) => {
  const account = await getAccount()
  kit.connection.addAccount(account.privateKey)

  // const anAddress = '0x6A06e5d199fe0C06893f7C7093E9A5e11c7c1696'
  const anAddress = user.walletAddress
  const amount = (1000000000000000000 * reward.value)

  // 14. Get the token contract wrappers 
  const stabletoken = await kit.contracts.getStableToken()

  // 15. Transfer CELO and cUSD from your account to anAddress
  // const celotx = await goldtoken.transfer(anAddress, amount).send({ from: account.address })
  const cUSDtx = await stabletoken.transfer(anAddress, String(amount)).send({ from: account.address, feeCurrency: stabletoken.address })

  // 16. Wait for the transactions to be processed
  // const celoReceipt = await celotx.waitReceipt()
  const cUSDReceipt = await cUSDtx.waitReceipt()

  // 17. Print receipts
  // console.log('CELO Transaction receipt: %o', celoReceipt)
  console.log('cUSD Transaction receipt: %o', cUSDReceipt)

  const cUSDBalance = await stabletoken.balanceOf(account.address)
  console.log(`Your new account cUSD balance: ${cUSDBalance.toString()}`)

  return {
    receipt: cUSDReceipt
  }
}

export const publishTweet = async (message) => {
  const publishBot = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
  })

  var postTweet = message
  publishBot.post(
    'statuses/update',
    { status: postTweet },
    function (err, data, response) {
      if (err) {
        console.log("ERRO: " + err)
        return false
      }
      console.log("Tweet postado com sucesso!\n");
    }
  )
}

export const createReward = (campaign, tweet) => {
  Rewards.create({
    influencerTwitterId: tweet.author_id,
    key: `${campaign._id}|${tweet.author_id}`,
    campaign: campaign._id,
    positivity: tweet.sentiment.SentimentScore.Positive,
    tweetId: tweet.id,
    value: 5
  })
    .then(reward => {
      console.log("reward created", reward)
      publishTweet(`${tweet.name}, you have been rewarded for your content 🤑! Go to CWorld to claim your cUSD!`)
    })
    .catch(e => {
      // console.log("error create reward", e)
    })
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Rewards.count(Object.assign(query, { deleted: false }))
    .then(count => Rewards.find(Object.assign(query, { deleted: false }), select, cursor)
      .then((campaigns) => ({
        count,
        rows: campaigns.map((campaigns) => campaigns.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const claimReward = ({ params, user }, res, next) =>
  Rewards.findOne({ _id: params.id, influencerTwitterId: user.twitterId, claimed: false })
    .then(notFound(res))
    .then(async (reward) => {
      if (reward) {
        const sendResponse = await send(reward, user)
        return Object.assign(reward, {
          claimed: true,
          receipt: {
            ...sendResponse.receipt,
            link: `https://alfajores-blockscout.celo-testnet.org/tx/${sendResponse.receipt.transactionHash}`
          }
        }).save()
      }
      return null
    })
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Rewards.findById(params.id)
    .then(notFound(res))
    .then((campaigns) => campaigns ? campaigns.view() : null)
    .then(success(res))
    .catch(next)
