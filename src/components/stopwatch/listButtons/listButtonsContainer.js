import React, { useState, useEffect, useRef } from 'react';
import { convertToTime } from "../../../functions";

const ListButtonsContainer = React.memo((props) => {
    const {
        onTimeChange,
        resetAllTime,
        deleteAllLists,
        stopTimeListLength
    } = props;

    const MIN_NUM = 0;
    const MAX_NUM = 99;
    const [openInput, setOpenInput] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const inputRef = useRef(null);
    const onTimeAdd = (time) => {
        onTimeChange({ running: false, initialTime: convertToTime(time) }, stopTimeListLength + 1);
        setOpenInput(false);
        setSeconds(0);
    }
    const keyPress = (e) => {
        if (e.keyCode == 13 && seconds > 0) {
            onTimeAdd(seconds);
        }
    }

    useEffect(() => {
        if (seconds > MAX_NUM) {
            setSeconds(99)
        } else if (seconds < MIN_NUM) {
            setSeconds(0)
        }
    }, [seconds])

    const handleInputChange = (e) => {
        setSeconds(Math.floor(Number(e.target.value)))
    }

    const toggleInputView = () => {
        setOpenInput(prev => !prev);
    }

    return props.children({
        MAX_NUM,
        MIN_NUM,
        seconds,
        inputRef,
        keyPress,
        openInput,
        onTimeAdd,
        resetAllTime,
        deleteAllLists,
        toggleInputView,
        handleInputChange,
    })
})

export default ListButtonsContainer