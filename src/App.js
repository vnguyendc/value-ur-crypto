import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [currentValue, setCurrentValue] = useState(0);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [coinSymbol, setCoinSymbol] = useState("bitcoin");
  const [yearsAgo, setYearsAgo] = useState(1);
  const [pastCoinPrice, setPastCoinPrice] = useState(0);
  const [currentCoinPrice, setCurrCoinPrice] = useState(0);
  const [percentGain, setPercentGain] = useState(0);
  const [todaysDate, setTodaysDate] = useState('');
  const [countRequest, setCountRequest] = useState(0);
  var coinList = []

  const handleChange = async (e) => {
    console.log(document.getElementById('initInvest').value)
    console.log(document.getElementById('years').value)

    setInitialInvestment(document.getElementById('initInvest').value)
    setYearsAgo(document.getElementById('years').value)

    const data = {
      initInvest: initialInvestment,
      coinSymbol: coinSymbol,
      yearsAgo: yearsAgo,
    }

    try {
      const res = await axios.post('/crypto', { data })
      console.log(res);
      console.log(res.data)
      setCurrentValue(res.data.value)
      setPastCoinPrice(res.data.pastPrice)
      setCurrCoinPrice(res.data.currentPrice)
      setTodaysDate(res.data.todaysDate)
      setPercentGain(res.data.percentGain)
      setCountRequest(countRequest + 1);
      console.warn(`you have made ${countRequest} POST requests.`)
    } catch (e) {
      console.error(e)
    }
  };

  useEffect(() => {
    const request = axios.CancelToken.source()

    const getCoinList = async () => {
      try {
        if (coinList.length === 0) {
          const res = await axios.get('/coins', { cancelToken: request.token })
          const resList = res.data.coin_list
          for (var i = 0; i < resList.length; i++) {
            coinList.push({
              value: resList[i][0],
              label: <div className="selectBox__label">
                <img alt="coin-logo" src={resList[i][2]} width='20' height="20" />
                {resList[i][1]}</div>
            });
          };
          console.log('list of coins:', coinList);
        }
      } catch (error) {
        console.error(error)
      }
    };

    getCoinList();
    handleChange();

    return () => request.cancel()
  })

  return (

    <div className="App">
      {/* <div className="header">
        <header>Crypto Investment Calculator</header>
      </div> */}

      <div className="body">
        <div className="inputsRow">
          <form method="post">
            <div className="inputBox">
              <label>Initial Investment</label>
              <input
                name='initInvest'
                id='initInvest'
                onChange={handleChange}
                value={initialInvestment}
                placeholder="Initial Investment ($)"
                type="number"
                min={0}
              />
            </div>

            <div className="inputBox">
              <label> Coin </label>
              <Select
                placeholder="Select a coin"
                id='coinSelect'
                onChange={(e) => { setCoinSymbol(e.value); handleChange() }}
                value={coinList.label}
                options={coinList}
                width="180px"
                isSearchable />
            </div>

            <div className="inputBox">
              <label>Number of years invested</label>
              <input
                name='years'
                id='years'
                onChange={handleChange}
                value={yearsAgo}
                placeholder="Number of years invested"
                type="number"
                min={1}
              />
            </div>

          </form>
        </div>

        <div className="resultRow">
          <p>You would have</p>
          <h1>${currentValue.toFixed(2).toLocaleString()}</h1>
        </div>

        <div className="infoRow">
          <div className="addInfoText">
            <p>Current price of {coinSymbol}: </p>
            <h2>${currentCoinPrice.toFixed(2)}</h2>
          </div>
          <div className="addInfoText">
            <p>Price of {coinSymbol} {yearsAgo} years ago: </p>
            <h2>${pastCoinPrice.toFixed(2)}</h2>
          </div>
          <div className="addInfoText">
            <p>That's a gain/loss of </p>
            <h2>{percentGain.toFixed(2)}%</h2>
          </div>
        </div>
      </div>

      <div className='footer'>
        <footer>made by vinhthekid</footer>
      </div>
    </div>
  );
}

export default App;