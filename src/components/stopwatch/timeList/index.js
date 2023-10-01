import React from "react";
import "./style.css";
import RuningClock from "../runingClock"

const TimeList = React.memo((props) => {
    const {
        onTimeTick,
        timerState,
        onTimeChange,
        stopTimeList,
        onTimeRemove,
        setTimerState,
    } = props;
    return <div className="timeList">
        {stopTimeList.map((item, id) => {
            return <RuningClock
                key={id}
                item={item}
                clockIndex={id}
                timerState={timerState}
                onTimeTick={onTimeTick}
                onTimeChange={onTimeChange}
                onTimeRemove={onTimeRemove}
                setTimerState={setTimerState} />
        })}
    </div>
})

export default TimeList;