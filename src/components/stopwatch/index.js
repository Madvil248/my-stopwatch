import React from "react";
import RunButtons from "./runButtons"
import ListButtons from "./listButtons"
import StopwatchContainer from "./stopwatchContainer"
import TimeList from "./timeList"
import './style.css';

const Stopwatch = React.memo((props) => {
    return <StopwatchContainer {...props}>
        {(data) => {
            const {
                running,
                timerState,
                runAllClock,
                onTimeChange,
                onTimeRemove,
                stopTimeList,
                pauseAllClock,
                setTimerState,
                startAllClock,
                deleteAllLists,
                resetTimeCount,
                restartTimeLists,
                stopAllTimeLists,
            } = data;
            return (
                <div className="stopwatch">
                    <div className="stopwatchList">
                        <TimeList
                            timerState={timerState}
                            onTimeTick={runAllClock}
                            onTimeChange={onTimeChange}
                            onTimeRemove={onTimeRemove}
                            stopTimeList={stopTimeList}
                            setTimerState={setTimerState}
                        />
                        {!running &&
                            <ListButtons
                                onTimeChange={onTimeChange}
                                deleteAllLists={deleteAllLists}
                                resetAllTime={resetTimeCount}
                                stopTimeListLength={stopTimeList.length}
                            />}
                    </div>
                    <RunButtons
                        running={running}
                        timerState={timerState}
                        startAllClock={startAllClock}
                        stopAllClock={stopAllTimeLists}
                        pauseAllClock={pauseAllClock}
                        restartTimeLists={restartTimeLists}
                    />
                </div>
            );
        }}
    </StopwatchContainer>
})

export default Stopwatch;