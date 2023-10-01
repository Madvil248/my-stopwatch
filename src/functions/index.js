export const timeConvert = (time) => {
    return [
        ("0" + Math.floor(time / 1000)).slice(-2),
        ("0" + Math.floor((time % 1000) / 10)).slice(-2)
    ];
}

export const convertToTime = (sec = 0) => {
    return sec * 1000;
}