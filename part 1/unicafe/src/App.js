import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / (good + neutral + bad);
  const positive = (good / (good + neutral + bad) * 100) + " %";
  return (
    <div>
      <h3>Statistics</h3>
      {(good + neutral + bad) !== 0 ? (
        <>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={avg} />
          <Statistic text="positive" value={positive} />
        </>
      ) :
        <div>No feedback given</div>
      }
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (<div>{text} {value}</div>)
}

const Button = ({ text, handleClicks }) => {
  return (
    <button onClick={handleClicks}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClicks={() => setGood(good + 1)} />
      <Button text="neutral" handleClicks={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClicks={() => setBad(bad + 1)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;