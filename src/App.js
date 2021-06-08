import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import InputBox from './InputBox';
import './App.css';

function App() {
  const [currentValue, setCurrentValue] = useState(0);

  // useEffect(() => {
  //   fetch('/crypto')
  //   .then(res => res.json())
  //   .then(data => {
  //     setCurrentValue(data.value);
  //   })
  // })

  return (
    <div className="App">
      <header className="App-header">
        <InputBox></InputBox>

        <p>You would have ${currentValue}.</p>
      </header>
    </div>
  );
}

export default App;