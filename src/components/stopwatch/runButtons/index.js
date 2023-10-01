import React from "react";
import './style.css';

const RunButtons = ((props) => {
    const {
        running,
        timerState,
        stopAllClock,
        startAllClock,
        pauseAllClock,
        restartTimeLists,
    } = props;
    const startPause = !running ? (timerState == 'ownTime' ? "Continue" : "Start") : "Pause"
    return (
        <div className="buttons">
            <button onClick={running ? pauseAllClock : startAllClock}>
                {startPause}
            </button>
            <button onClick={stopAllClock}>
                {"Stop"}
            </button>
            <button onClick={restartTimeLists}>
                {"Reset"}
            </button>
        </div >
    );
})

export default RunButtons;