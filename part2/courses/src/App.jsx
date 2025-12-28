import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useUser } from '../context/UserContext';
function UserProfile() {
  const { name } = useUser();   
  return (<div><p>name: {name}</p></div>);
}

function Button(props) {
  return (
    <button onClick={props.onClick} className='button'>
      {props.text}
    </button>
  )
}
<UserProvider>
  <App />
</UserProvider>
function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const handleFeedback = (type) => {
    setFeedback({
      ...feedback,
      [type]: feedback[type] + 1
    })
  }

  const Statistics = (props) => {
    const total = props.feedback.good + props.feedback.neutral + props.feedback.bad;
    const average = total === 0 ? 0 : (props.feedback.good - props.feedback.bad) / total;
    const positive = total === 0 ? 0 : (props.feedback.good / total) * 100;

    return (
      <>
        {total === 0 ? (
          <p>No feedback given</p>
        ) : (
          <table className='statistics-table'>
            <tbody>
              <tr>
                <td>good</td>
                <td>{feedback.good}</td>
              </tr>
              <tr>
                <td>neutral</td>
                <td>{feedback.neutral}</td>
              </tr>
              <tr>
                <td>bad</td>
                <td>{feedback.bad}</td>
              </tr>
              <tr>
                <td>all</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>average</td>
                <td>{average.toFixed(1)}</td>
              </tr>
              <tr>
                <td>positive</td>
                <td>{positive.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    )
  }

  return (

    <>
      <div>
        <UserProfile />
        <h1>Give feedback</h1>
        <Button onClick={() => handleFeedback('good')} text="good">
          good
        </Button>
        <Button onClick={() => handleFeedback('neutral')} text="neutral">
          neutral
        </Button>
        <Button onClick={() => handleFeedback('bad')} text="bad">
          bad
        </Button>
      </div>
      <h2>Statistics</h2>
      <Statistics feedback={feedback} />

    </>
  )
}

export default App


