import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [results, setResults] = useState([]);
  const timeRef = useRef(null);

  const startTimer = () => {
    timeRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timeRef.current);
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimer();
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      stopTimer();
      setResults((prevResults) => [...prevResults, formatTime(time)]);
    }
  };

  const handleRestart = () => {
    stopTimer();
    setTime(0);
    if (isRunning) {
      startTimer();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div>
        <p>{String(Math.floor(time / 60)).padStart(2, '0')} : {String(time % 60).padStart(2, '0')}</p>
      </div>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleRestart}>Restart</button>

      <div>
        <h2>Last Results</h2>
        <ul>
          {results.map((result, index) => (
              <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
