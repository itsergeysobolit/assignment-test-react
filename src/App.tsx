import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios'; //import axios for working with request


function App() {

  const [upTime, setUpTime] = useState('');
  const [counter, setCounter] = useState(10); // initial value counter = 10 

  // countdown timer
  function updateCounter() {
    setCounter(counter - 1); //change number
    if (counter > 0) {
    } else {
      setCounter(10);
      getUpTime(); // call function when counter <= 0
    }
    console.log('counter = ' + counter);
  }

  useEffect(() => {
    const intervalID = setInterval(updateCounter, 1000);
    return () => clearInterval(intervalID);
  }, [counter]) //counter value changes

  // request for getting our upTime from incquery server
  function getUpTime() {
    const url = 'http://localhost:8089/https://openmbee.incquery.io/api/server.status';
    const AuthStr = 'Basic b3Blbm1iZWVndWVzdDpndWVzdA=='; //our auth data on format Base64
    // get data on format json with axios
    axios.get(url, {
      headers: {
        'Authorization': AuthStr,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setUpTime(response.data.upTime.seconds) //pick up our seconds from response
        console.log('uptime = ' + response.data.upTime.seconds)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Wait <span className="App-counter">{counter}</span> seconds for update upTime</p>
        <p>upTIME = {upTime}</p>
      </header>
    </div>
  );
}

export default App;