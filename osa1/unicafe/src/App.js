import React, { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td> 
         {props.text} </td><td> {props.amount}
         </td>
      </tr>
      </>
  )
}

const Statistic = (props) => {
  console.log(props.valueAll)
  if ( props.valueAll == 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
  <table><tbody>
  <StatisticLine text="good" amount={props.good} />
  <StatisticLine text="neutral" amount={props.neutral} />
  <StatisticLine text="bad" amount={props.bad} />
  <StatisticLine text="all" amount={props.valueAll} />
  <StatisticLine text="average" amount={props.average} />
  <StatisticLine text="positive" amount={props.positive*100} />
  </tbody></table>
  )

}

const Button = (props) => {
  return (
  <button onClick = {() => {
    props.Setreview(props.review+1)
    props.allSet(props.valueAll+1)
  }}>
  {props.text}
  </button>
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
      <Button Setreview = {setGood} allSet = {setAll} review={good} valueAll={all} text = "good" />
      <Button Setreview = {setNeutral} allSet = {setAll} review={neutral} valueAll={all} text = "neutral" />
      <Button Setreview = {setBad} allSet = {setAll} review={bad} valueAll={all} text = "bad" />

      <h1>statistics</h1>
     <Statistic good = {good} neutral = {neutral} bad = {bad} valueAll = {all} average = {average}  positive = {positive} />

    </div>

  )
}

export default App