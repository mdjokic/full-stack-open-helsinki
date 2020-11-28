import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({ title, anecdote, votes }) => (
  <>
    <h1>{title}</h1>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
  </>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [maxInx, setMaxInx] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleClick = () => {
    let anecdoteIndex = Math.round(Math.random() * (anecdotes.length - 1));
    while (anecdoteIndex === selected) {
      anecdoteIndex = Math.round(Math.random() * (anecdotes.length - 1));
    }
    setSelected(anecdoteIndex);
  }

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
    updateMax(votesCopy);
  }

  const updateMax = (votesCopy) => {
    const updatedIndex = votesCopy.reduce(((max, anecdoteVotes, currentIndex) => votes[max] >= anecdoteVotes ? max : currentIndex), 0);
    setMaxInx(updatedIndex);
  }

  return (
    <div>
      <div>
        <Anecdote
          title='Anecdote of the day'
          anecdote={anecdotes[selected]}
          votes={votes[selected]} />
      </div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>
      <div>
        <Anecdote
          title='Anecdote with most votes'
          anecdote={anecdotes[maxInx]}
          votes={votes[maxInx]} />
      </div>
    </div >
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)