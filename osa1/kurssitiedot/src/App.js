import React from 'react'

const Header = (props) => {
return (
<div>
<h1>  {props.course}</h1>
</div>  
)
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.part} {props.exercises} </p>
    </div>
  )
}

const Total = (props) => {
  return(
  <div>
    <p> Number of exercises {props.tasks} </p>
  </div>

  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
  <Header course = {course} />
  <Content part1 = {parts[0].name} exercises1 = {parts[0].exercises} />
  <Content part2 = {parts[1].name} exercises2 = {parts[1].exercises} />
  <Content part3 = {parts[2].name} exercises3 = {parts[2].exercises} />
  <Total tasks = {parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App