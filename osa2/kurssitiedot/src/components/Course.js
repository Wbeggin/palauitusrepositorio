let total = 0
const Course = ({ course, parts}) => {
    console.log({course})   
    console.log({parts})

    return(
        <div>
        <h1>{course.name}</h1>
        <ul>
            {parts.map(part =>
                <li key = {part.id}>
                    {part.name + " " + part.exercises}
                </li>
                )}
        </ul>

        {parts.map(part =>
            calculateTotal(part.exercises)
         )}

        <b>Total of {total} exercises</b>

        </div>
    )
}

const calculateTotal = (number) => {
    total += number
}


export default Course