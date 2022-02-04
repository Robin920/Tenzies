import React, { useState } from 'react';
import './App.css';
import Die from '../Die/Die'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Timer from '../Timer/Timer'

function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls,setRolls] = React.useState(0)
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])
  
  React.useEffect(() => {
    setIsPaused(prevPauseState => !prevPauseState)
  }, [tenzies])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
  function rollDice() {
      if(!tenzies) {
          handleStart()
          setRolls(prevRoll => prevRoll+1)
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
      } else {
        handleReset()
        setRolls(0)
          setTenzies(false)
          setDice(allNewDice())
      }
  }
  
  function holdDice(id) {
      handleStart()
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }
  
  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  ))
  let minute = (Math.floor((time / 60000) % 60))
  let second = Math.floor((time / 1000) % 60)
  let miliSecond = (time / 10) % 100
  React.useEffect(() => {
    console.log(time)
}, [time])
  return (
    <div className="tenzie-box">
      {/*
      {console.log("Minute:",minute,"|","Second:",second,"|","Milisecond:",miliSecond)} */}
      <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <span><h2>Number of rolls : {rolls}</h2>
          </span>
          <Timer time={time}/>
          <div className="dice-container">
              {diceElements}
          </div>
          <button 
              className="roll-dice" 
              onClick={rollDice}
          >
              {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
      </div>
  )
}

export default App;
