function getTimes(text) {
    const times = [["hr",3600], ["hour",3600], ["hours",3600], ["min",60],["mins",60], ["minute",60], ["minutes",60], ["sec",1], ["second",1], ["seconds",1]];

    const splitText = text.split(/\s*\b\s*/)
    let number;
    let unit;
    //console.log(splitText)
    times.forEach((time) => {
        let pos = splitText.indexOf(time[0])
        if (pos > -1) {
            //console.log(splitText[pos-1])
            if (typeof Number(splitText[pos-1]) === 'number') {
                //console.log(splitText[pos-1])
                number = (splitText[pos-1] * time[1]) 
            }
        }
    })
    return number;
}

module.exports  = {
    getTimes: getTimes,
}