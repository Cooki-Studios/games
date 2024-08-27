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

let rand = Math.floor(Math.random() * 100);
switch(true) {
    case (rand < 25):
        document.getElementById("message").innerText = "An UPDATE is COMING SOON."
        break;
    case (rand < 50):
        document.getElementById("message").innerText = "An UPDATE is IN THE WORKS."
        break;
    case (rand < 75):
        document.getElementById("message").innerText = "NEW UPDATE SOON."
        break;
    case (rand < 100):
        document.getElementById("message").innerText = "Guess when that timer is counting to..."
        break;
    case (rand === 100):
        document.getElementById("message").innerText = "This is a 1% chance!"
        break;
}