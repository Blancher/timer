// Variables

const startStopBtn = document.querySelector('#startStopBtn');
const resetBtn = document.querySelector('#resetBtn');
const submitBtn = document.querySelector('#submit');
const displayTimer = document.querySelector('#timer');
const audio = document.querySelector('audio');
const domSeconds = document.querySelector('#seconds');
const domMinutes = document.querySelector('#minutes');
const domHours = document.querySelector('#hours');
const endMessage = document.querySelector('#endmessage');

// Times

let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

// Functions

function valueAssigner(value, num) {
    if (parseInt(value) > 0) {
        return parseInt(value);
    } else {
        return num;
    }
}
function addZeroes(time) {
    if ((`${time}0`).length > 2) {
        return time;
    } else {
        return `0${time}`;
    }
}
function stopWatch() {
    if (hours >= 0) {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        seconds = addZeroes(seconds);
        minutes = addZeroes(minutes);
        hours = addZeroes(hours);
        if (hours === -1) {
            displayTimer.textContent = '00:00:00';
        } else {
            displayTimer.textContent = `${hours}:${minutes}:${seconds}`;
        }
    } else {
        startStopBtn.disabled = true;
        endMessage.textContent = 'Your timer is over.';
        document.querySelector('audio').play();
    }
}

// Event listeners

startStopBtn.addEventListener('click', () => {
    seconds = valueAssigner(domSeconds.value, seconds);
    minutes = valueAssigner(domMinutes.value, minutes);
    hours = valueAssigner(domHours.value, hours);
    domSeconds.value = "";
    domMinutes.value = "";
    domHours.value = "";
    displayTimer.textContent = `${addZeroes(hours)}:${addZeroes(minutes)}:${addZeroes(seconds)}`;
    endMessage.textContent = '';
    if (startStopBtn.textContent === 'Start') {
        interval = setInterval(stopWatch, 1000);
        startStopBtn.textContent = 'Pause';
    } else if (startStopBtn.textContent === 'Pause') {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
    }
});
resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    displayTimer.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    endMessage.textContent = '';
    startStopBtn.disabled = false;
});
