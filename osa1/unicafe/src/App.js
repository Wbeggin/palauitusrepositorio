import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    setGood(good + newValue)
  }

  const setToNeutral = (newValue) => {
    setNeutral(neutral + newValue)
  }

  const setToBad = (newValue) => {
    setBad(bad + newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setToGood(1)}>
        good
        </button>
      <button onClick={() => setToNeutral(1)}>
        neutral
      </button>
      <button onClick={() => setToBad(1)}>
        bad
      </button>
      <h1>statistics</h1>
      <p>good {good}</p> 
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App