import { useState , useRef } from "react";
import ResultModal from "./Resultmodal.jsx";

export default function TimerChallenge({ title, targetTime }){

    const timer = useRef();
    const dialog = useRef();


    const [timerRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive  = timerRemaining > 0 && timerRemaining < targetTime * 1000;
    // const [ timerExpired, setTimerExpired ] = useState(false);
    // const [ timerStarted, setTimerStarted ] = useState(false);

    if(timerRemaining < 0 ){
        clearInterval(timer.current);
        //setTimeRemaining(targetTime * 1000);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }


    function handleStart(){
        timer.current = setInterval(() => {
            // setTimerExpired(true);
            // dialog.current.open();
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);

        // setTimerStarted(true);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }
 

    return (
    <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime = {timerRemaining} onReset={handleReset} /> 
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running... ' : 'Timer inactive'}
            </p>
        </section>

    </>
    );
}