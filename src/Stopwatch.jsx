import React,{useState,useRef,useEffect} from "react"

function Stopwatch(){
    const [running, setRunning] = useState(false)
    const [elapsedtime, setElapsedTime] = useState(0)
    const intervalRef = useRef(null)
    const startTimeRef = useRef(null)

    useEffect(()=>{
        
        if(running){
                intervalRef.current = setInterval(()=>{
                setElapsedTime(Date.now()- startTimeRef.current)
            },10)
        };
        
        return()=>{
            clearInterval(intervalRef.current)
        }
    },
    [running]);

    function Start(){
        setRunning(true)
        startTimeRef.current = Date.now() - elapsedtime
    }

    function Stop(){
        setRunning(false)
    }
    
    function Reset(){
        setElapsedTime(0)
        setRunning(false)
    }

    function formatTime(){
        let hours = Math.floor(elapsedtime / (1000*60*60));
        let minutes = Math.floor(elapsedtime/(1000*60)%60);
        let seconds = Math.floor(elapsedtime/ (1000) % 60);
        let milliseconds = Math.floor(elapsedtime%(1000) /10);

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");

        return `${minutes}:${seconds}:${milliseconds}`
    }

    return(<div className="box">
        <div className="Timer">{formatTime()}</div>
        <div className="Buttons">
            <button onClick={Start} className="Start">Start</button>
            <button onClick={Reset} className="Reset">Reset</button>
            <button onClick={Stop} className="Stop">Stop</button>
        </div>
    </div>)
}

export default Stopwatch