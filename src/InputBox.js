import React, { useState, useRef, useEffect } from 'react'
import Button from '@material-ui/core/Button';

function InputBox() {

    const [initialInvestment, setInitialInvestment] = useState(1000);
    const [coinSymbol, setCoinSymbol] = useState("bitcoin");
    const [yearsAgo, setYearsAgo] = useState(5);
    // const formRef = useRef(null)

    const saveData = () => {
        fetch('/crypto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            initInvest: initialInvestment,
            coin: coinSymbol,
            years: yearsAgo
          })
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result)
            setInitialInvestment(100)
            setCoinSymbol("bitcoin")
            setYearsAgo(5)
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Initial Investment: ", initialInvestment)
        console.log("Coin: ", coinSymbol)
        console.log("# of years: ", yearsAgo)
        saveData();
    };

    return (
        <div className="inputBox" >
            <form onSubmit={handleSubmit}>
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
                <input
                    name='coin'
                    id='coin'
                    className="inputBox"
                    onChange={e => setCoinSymbol(e.target.value)}
                    value={coinSymbol}
                    placeholder="Coin Symbol"
                    type="text"
                />

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

            </form><br></br>
            <button
                type='submit'
                variant='contained'
                color="secondary"
            >Submit</button>
        </div>
    )
}

export default InputBox
