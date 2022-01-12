import React, { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <p>
         {props.text} {props.amount}
      </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let valueAll = bad + neutral + good
  let average = (good-bad)/valueAll
  let positive = good/valueAll

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>
        good
        </button>
      <button onClick={() => setNeutral(neutral+1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad+1)}>
        bad
      </button>
      <h1>statistics</h1>
      <Statistics text="good" amount={good} />
      <Statistics text="neutral" amount={neutral} />
      <Statistics text="bad" amount={bad} />
      <Statistics text="all" amount={valueAll} />
      <Statistics text="average" amount={average} />
      <Statistics text="positive" amount={positive*100} />
      

    </div>

  )
}

export default App