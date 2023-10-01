import React from 'react';

const TimeListContainer = React.memo((props) => {
    const { stopTimeList, onTimeRemove, onTimeTick, onTimeChange, timerState, setTimerState } = props;

    return props.children({
        stopTimeList,
        onTimeRemove,
        onTimeTick,
        onTimeChange,
        timerState,
        setTimerState,
    })
})

export default TimeListContainer