import './App.css';
import axios from 'axios'
import React, {useEffect, useState} from "react"
import Transactions from './components/Transactions';
import Chart from './components/Chart'
import Buttons from './components/Buttons';
import config from './config';

const LN_BITS_PAYMENTS_URL = `https://legend.lnbits.com/api/v1/payments`
const LN_BITS_WALLET_URL = `https://legend.lnbits.com/api/v1/wallet`
const LN_BITS_ADMIN_KEY = config.adminKey


function App() {
 
  const [price, setPrice] = useState(null)
  const [balance, setBalance] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [transactions, setTransactions] = useState([])

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      .then((res) => setPrice(res.data.data.amount))
      .catch((err) => console.error(`Error getting btc price: ${err}`))
  }

  const getWaletBalance = (apikey, url) => {
    const headers = {
      "X-Api-Key": apikey
    }
    axios
      .get(url, {headers})
      .then((res) => setBalance(Number(res.data.balance) / 1000))
      .catch((err) => console.error(`Error getting wallet ballance: ${err}`))
  }

  const getTransactions = (apikey, url) => {
    const headers = {
      "X-Api-Key": apikey
    }
    axios
    .get(url, {headers}) 
    .then((res) => setTransactions(res.data))
    .catch((err) => console.error(`Error getting transaction data: ${err}`))
  }

  const updateChartData = (currentPrice) => {
    const timestamp = Date.now()
    setChartData((prevState) => {
      if (!prevState) 
        return [
          {
            x: timestamp,
            y: Number(currentPrice)
          }
        ]
      
      if (prevState[prevState.length - 1].x === timestamp ||
        prevState[prevState.length - 1].y === Number(currentPrice)) return prevState

        return [
          ...prevState,
          {
            x: timestamp,
            y: Number(currentPrice),
          }
        ]
    })
    
  }


  
  useEffect(() => {
    getPrice()
    getWaletBalance(LN_BITS_ADMIN_KEY, LN_BITS_WALLET_URL)
    getTransactions(LN_BITS_ADMIN_KEY, LN_BITS_PAYMENTS_URL)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getPrice()
      getWaletBalance(LN_BITS_ADMIN_KEY, LN_BITS_WALLET_URL)
      getTransactions(LN_BITS_ADMIN_KEY, LN_BITS_PAYMENTS_URL)
    }, 5000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="App">
      <header>
        <h1>pleb wallet</h1>
      </header>
      <Buttons />
      <div className="row">
        <div className="balance-card">
          <h2>Balance</h2>
          <p>{balance} sats</p>
        </div>
        <div className="balance-card">
          <h2>Price</h2>
          <p>${price}</p>
        </div>
      </div>
      <div className="row">
        <div className="row-item">
          <Transactions transactions={transactions} />
        </div>
        <div className="row-item">
          <Chart chartData={chartData} />
        </div>
      </div>
      <footer>
        <p>Made by plebs, for plebs.</p>
      </footer>
    </div>
  );
}

export default App;
