import React from "react"
import "./Die.css"
import One from '../Die/One'
import Two from '../Die/Two'
import Three from '../Die/Three'
import Four from '../Die/Four'
import Five from '../Die/Five'
import Six from '../Die/Six'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    function diceFaceShow() {
        if(props.value === 1) {
            return <One />
        }
        else if(props.value === 2) {
            return <Two />
        }
        else if(props.value === 3) {
            return <Three />
        }
        else if(props.value === 4) {
            return <Four />
        }
        else if(props.value === 5) {
            return <Five />
        }
        else {
            return <Six />
        }
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{diceFaceShow()}</h2>
        </div>
    )
}