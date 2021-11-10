function getTimes(text) {
    const times = [["hr",3600], ["hours",3600], ["mins",60],["min",60], ["sec",1]];
    const splitText = text.split(" ")
    let number;
    let unit;

    times.forEach((time) => {
        //console.log(time[0])
        let pos = splitText.indexOf(time[0])
        if (pos > -1) {
            number = (splitText[pos-1] * time[1]);
        }
    })
    return number;
}

module.exports  = getTimes;