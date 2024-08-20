function timeChange() {
    let distance = new Date().getTime() - new Date("1 April 2025").getTime();
    let days = Math.abs(Math.floor(distance / (1000 * 60 * 60 * 24)));
    let hours = Math.abs(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = Math.abs(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = Math.abs(Math.floor((distance % (1000 * 60)) / 1000));

    days--;
    minutes--;

    if (seconds === 60) {
        seconds = 0;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (hours  < 10) {
        hours = "0" + hours;
    }

    if (days < 10) {
        days = "0" + days;
    }

    if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
        document.getElementById("time").innerText = "I sure hope there has been an update...";
    } else {
        document.getElementById("time").innerText = days + " : " + hours + " : " + minutes + " : " + seconds;
    }
}

setInterval(timeChange, 1000 - new Date().getMilliseconds());

document.getElementById("message").innerText;