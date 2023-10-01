import React, { useState, useEffect, useCallback } from 'react';

const StopwatchContainer = React.memo((props) => {
    const [running, setRunning] = useState(false);
    const [timerState, setTimerState] = useState('start');
    const [stopTimeList, setStopTimeList] = useState([]);

    useEffect(() => {
        const localStopTimeList = JSON.parse(localStorage.getItem('timerList'));
        if (localStopTimeList) {
            setStopTimeList(localStopTimeList);
        }
    }, []);

    const deleteAllLists = useCallback(() => {
        setStopTimeList([]);
    }, [])

    const setLocalData = (data) => {
        localStorage.setItem('timerList', JSON.stringify(data));
    }

    const getHighestTime = useCallback(() => {
        return Math.max(...stopTimeList.map(o => o.initialTime));
    }, [stopTimeList])

    const runTimerByTime = useCallback((list = stopTimeList, time) => {
        return list.map(i => {
            if (i.initialTime >= (Number(time) - 10))
                return { ...i, running: true }
            else
                return { ...i, running: false }
        })
    }, [stopTimeList])

    const runAllClock = useCallback((val) => {
        const highestTime = val ? val : getHighestTime();
        setRunning(true);
        setStopTimeList(prevTimeList => runTimerByTime(prevTimeList, highestTime))
    }, [getHighestTime, runTimerByTime])

    const pauseAllClock = useCallback(() => {
        setTimerState("ownTime");
        setStopTimeList(prevTimeList => prevTimeList.map(i => ({ ...i, running: false })))
    }, [])

    const onTimeChange = useCallback((time, index) => {
        let newStopTimeList = [...stopTimeList];
        if (stopTimeList.length < index) {
            newStopTimeList.push(time);
        } else {
            newStopTimeList.splice(index, 1, time);
        }
        setLocalData(newStopTimeList);
        setStopTimeList(newStopTimeList);
    }, [stopTimeList])

    const onTimeRemove = useCallback((index) => {
        let newStopTimeList = [...stopTimeList];
        newStopTimeList.splice(index, 1);
        setLocalData(newStopTimeList);
        setStopTimeList(newStopTimeList);
    }, [stopTimeList])

    const startAllClock = useCallback(() => {
        if (stopTimeList.length) {
            setTimerState("ownTime");
            runAllClock();
        }
    }, [runAllClock, stopTimeList])

    const resetTimeCount = useCallback(() => {
        setTimerState("initial");
        setStopTimeList(prevTimeList => prevTimeList.map(i => ({ ...i, running: false })))
    }, [])

    const stopAllTimeLists = useCallback(() => {
        setTimerState("stop");
        setStopTimeList((prevList) => prevList.map(i => ({ ...i, running: false })));
    }, [])

    const restartTimeLists = useCallback(() => {
        setTimerState("restart");
        setStopTimeList((prevList) => prevList.map(i => ({ ...i, running: false })));
    }, [])

    const onRestart = useCallback(() => {
        setTimerState("initial");
        runAllClock();
    }, [runAllClock])

    useEffect(() => {
        let clockRunning = false;
        for (let i = 0; i < stopTimeList.length; i++) {
            if (stopTimeList[i].running) {
                clockRunning = true;
                break;
            }
        }
        if (!clockRunning && timerState === "restart") onRestart();
        if (!clockRunning && (timerState === "stop")) setTimerState("initial");
        if (clockRunning && (timerState === "stop")) stopAllTimeLists();
        setRunning(clockRunning);
    }, [stopTimeList, timerState, onRestart, stopAllTimeLists])

    return props.children({
        running,
        timerState,
        runAllClock,
        stopTimeList,
        onTimeChange,
        onTimeRemove,
        startAllClock,
        pauseAllClock,
        setTimerState,
        deleteAllLists,
        resetTimeCount,
        stopAllTimeLists,
        restartTimeLists,
    })
})

export default StopwatchContainer