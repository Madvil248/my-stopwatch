import React from "react";
import './style.css';
import ListButtonsContainer from "./listButtonsContainer";

const ListButtons = React.memo((props) => {
    return <ListButtonsContainer {...props}>
        {(data) => {
            const {
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
            } = data;
            return (
                <div className="listButtons">
                    <div className="addWrap">
                        < button onClick={toggleInputView}>
                            {"Add New"}
                        </button >
                        {openInput &&
                            <div className="inputWrap">
                                <input
                                    min={MIN_NUM}
                                    autoFocus
                                    max={MAX_NUM}
                                    ref={inputRef}
                                    type="number"
                                    value={seconds}
                                    onKeyDown={keyPress}
                                    onChange={handleInputChange}
                                />
                                {Number(seconds) === 0 ?
                                    <button onClick={() => toggleInputView}>{"Close"}</button>
                                    :
                                    <button onClick={() => onTimeAdd(seconds)}>{"Add"} </button>}
                            </div>}
                    </div>
                    <button onClick={resetAllTime}>
                        {"Reset"}
                    </button>
                    <button onClick={deleteAllLists}>
                        {"Delete All"}
                    </button>
                </div >
            );
        }}
    </ListButtonsContainer>
})

export default ListButtons;