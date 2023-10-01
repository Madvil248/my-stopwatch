import React from "react";
import { timeConvert } from "../../../functions"
import RuningClockContainer from "./runingClockContainer";
import './style.css';
import Progress from "./progress";

const RuningClock = React.memo((props) => {
    return <RuningClockContainer {...props}>
        {(data) => {
            const {
                time,
                height,
                onRemove,
            } = data;
            const convertedTime = timeConvert(Number(time));

            return <div className="runningNumbers">
                <div className="circle">
                    <Progress percentage={100 - height} />
                    <span>{convertedTime[0]}:</span>
                    <span>{convertedTime[1]}</span>
                    <div className="close" onClick={onRemove}>
                        <span>{"x"}</span>
                    </div>
                </div>
            </div>
        }}
    </RuningClockContainer>
})

export default RuningClock;