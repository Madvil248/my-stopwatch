import React, { useState, useEffect } from 'react';

const RuningClockContainer = React.memo((props) => {
    const {
        item,
        onTimeRemove,
        clockIndex,
        onTimeTick,
        onTimeChange,
        timerState,
        setTimerState
    } = props;

    const { initialTime, running } = item;
    const [time, setTime] = useState(initialTime);
    const [height, setHeight] = useState(100);

    const onRemove = () => {
        onTimeRemove(clockIndex);
    }

    useEffect(() => {
        setHeight(time ? (100 * time) / initialTime : 0)
    }, [running, time, initialTime])

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        if (running) {
            if (time >= 0) {
                onTimeTick(time);
            } else {
                setTime(initialTime);
                onTimeChange({ initialTime, running: false }, clockIndex);
                setTimerState("stop");
            }
        } else {
            setTime(initialTime);
        }
    }, [time, initialTime]);

    useEffect(() => {
        if (timerState === "initial") {
            setTime(initialTime);
        } else {
            onTimeChange({ initialTime, running }, clockIndex);
        }
    }, [timerState, clockIndex]);

    return props.children({
        time,
        height,
        onRemove,
    })
})

export default RuningClockContainer