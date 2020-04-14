import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({ text }) => (
    <>
        <h1>{text}</h1>
    </>
)

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const StatsLine = ({ text, value }) => (
    <tr>
        <th>{text}</th>
        <td>{value}</td>
    </tr>
)

const Stats = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = good * 100 / all
    const content = (all > 0) ? (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatsLine text='good' value={good} />
                    <StatsLine text='neutral' value={neutral} />
                    <StatsLine text='bad' value={bad} />
                    <StatsLine text='all' value={all} />
                    <StatsLine text='average' value={average.toFixed(1)} />
                    <StatsLine text='positive' value={positive.toFixed(1) + '%'} />
                </tbody>
            </table>
        </div>
    ) : (
        <div>
            <h2>statistics</h2>
            <p>no feedback given yet</p>
        </div>
    )

    return(content)
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    return (
      <div>
        <Header text='give feedback'/>
        <Button onClick={() => setGood(good + 1)} text='good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button onClick={() => setBad(bad + 1)} text='bad' />
        <Stats good={good} neutral={neutral} bad={bad} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));