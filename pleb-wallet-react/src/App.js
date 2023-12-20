import './App.css';
import axios from 'axios'
import React, {useEffect, useState} from "react"

function App() {
  const [price, setPrice] = useState(0)

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      .then((res) => {
        setPrice(res.data.data.amount)
      })
      .catch((err) => {
        console.error(`Error getting btc price: ${err}`)
      })
  }
  useEffect(() => {
    getPrice()
  }, [])

  return (
    <div className="App">
      <h1>${price}</h1>
    </div>
  );
}

export default App;