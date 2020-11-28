
const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content
                parts={course.parts}
            />
            <Total
                parts={course.parts}
            />
        </div>
    )
}

const Header = ({ title }) => (
    <h1>{title}</h1>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part =>
            <Part key={part.id} name={part.name} exercise={part.exercises} />
        )}
    </div>
)

const Part = ({ name, exercise }) => (
    <p>{name} {exercise}</p>
)

const Total = ({ parts }) => (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
)

export default Course;