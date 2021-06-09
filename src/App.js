import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select } from 'antd';
import logo from './logo.svg';
import './App.css';

function App() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const [currentValue, setCurrentValue] = useState(0);
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [coinSymbol, setCoinSymbol] = useState("bitcoin");
  const [yearsAgo, setYearsAgo] = useState(5);
  const [coinList, setCoinList] = useState([])
  const { Option } = Select;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      initInvest: initialInvestment,
      coinSymbol: coinSymbol,
      yearsAgo: yearsAgo,
    }
    console.log("Initial Investment: ", initialInvestment)
    console.log("Coin: ", coinSymbol)
    console.log("# of years: ", yearsAgo)

    axios.post('/crypto', { data })
      .then(res => {
        console.log(res);
        console.log(res.data)
        setCurrentValue(res.data.value)
      })
      .catch(e => {
        console.log(e)
      })
  };

  const getCoinList = () => {
    if (coinList.length === 0) {
      console.log('getting coin list')
      axios.get('/coins')
        .then(res => {
          console.log('list of Coins:', res.data.coin_list);
          setCoinList(res.data.coin_list);
        })
    }
  };

  getCoinList()

  return (

    <div className="App">

      <header className="App-header">
        <div className="inputBox" >
          <form method="post">
            <label>If you invested $</label>
            <input
              name='initInvest'
              id='initInvest'
              className="inputBox"
              onChange={e => setInitialInvestment(e.target.value)}
              value={initialInvestment}
              placeholder="Initial Investment ($)"
              type="number"
            />

            <label> in </label>
            {/* <Select placeholder="Select a coin"
            onChange={e => setCoinSymbol(e.target.value)}
            value={coinSymbol}
            style={{ width: 200 }}>
              <Option value="bitcoin">Bitcoin</Option>
              <Option value="ethereum">Ethereum</Option>
              <Option value="binancecoin">Binance Coin</Option>
              <Option value="cardano">Cardano</Option>
            </Select> */}
            <select placeholder="Select a coin"
            onChange={e => setCoinSymbol(e.target.value)}
            value={coinSymbol}
            style={{ width: 200 }}>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="binancecoin">Binance Coin</option>
              <option value="cardano">Cardano</option>
            </select>

            <input
              name='years'
              id='years'
              className="inputBox"
              onChange={e => setYearsAgo(e.target.value)}
              value={yearsAgo}
              placeholder="Years"
              type="number"
              min={1}
            />
            <label> years ago,</label>
            <p>
              <Button size="large" onClick={handleSubmit} type="primary">Submit</Button>
            </p>
          </form>
        </div>

        <p>You would have ${currentValue.toFixed(2).toLocaleString()}.</p>
      </header>
    </div>
  );
}

export default App;