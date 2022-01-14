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

const Reviews = (props) => {
  console.log(props.valueAll)
  if ( props.valueAll == 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
  <Statistics text="good" amount={props.good} />
  <Statistics text="neutral" amount={props.neutral} />
  <Statistics text="bad" amount={props.bad} />
  <Statistics text="all" amount={props.valueAll} />
  <Statistics text="average" amount={props.average} />
  <Statistics text="positive" amount={props.positive*100} />
  </div>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  let average = (good-bad)/all
  let positive = good/all

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => {
        setGood(good+1)
        setAll(all+1)
       // Reviews({good : {good}, neutral : {neutral}, bad : {bad}, valueAll : {valueAll}, average : {average} , positive : {positive}})
      }}>
        good
        </button>
      <button onClick={() => {
        setNeutral(neutral+1)
        setAll(all+1)
      }}>
        neutral
      </button>
      <button onClick={() => {
        setBad(bad+1)
        setAll(all+1)
      }}>
        bad
      </button>

      <h1>statistics</h1>
     <Reviews good = {good} neutral = {neutral} bad = {bad} valueAll = {all} average = {average}  positive = {positive} />

    </div>

  )
}

export default App