const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ title }) => <h3>{title}</h3>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercise={part.exercises} />
    ))}
  </div>
);

const Part = ({ name, exercise }) => (
  <p>
    {name} {exercise}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <h4>Number of exercises {total}</h4>;
};

export default Course;
