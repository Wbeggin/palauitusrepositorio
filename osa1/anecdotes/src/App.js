import { useState } from 'react'
const points = [0, 0, 0, 0, 0, 0, 0]
const copy = [...points]

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteCount, setVote] = useState(0)
  var max = Math.max.apply(null, copy)
  return (
    <div>
      <h1> anecdote of the day </h1>
      {anecdotes[selected]}
      <p>has {copy[voteCount]} votes </p> 
      <button onClick={() => {
        copy[voteCount] += 1
      }}>
        vote
      </button>
      <button onClick={() => {
        const xd = (Math.floor(Math.random() * 7) + 1)-1;
        setSelected(xd);
        setVote(xd)
        }}>
        Next anecdote
      </button>
      <h1> anecdote with most votes</h1>
        {anecdotes[copy.indexOf(max)]}
    </div>
  )
}


export default App
