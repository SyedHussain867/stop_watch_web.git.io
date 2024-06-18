let timer;
let isRunning = false;
let startTime;
let lapCount = 1;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById('startStopBtn').innerText = 'Start';
    isRunning = false;
  } else {
    startTime = Date.now() - (lapCount > 1 ? (lapCount - 1) * 1000 : 0);
    timer = setInterval(updateDisplay, 10);
    document.getElementById('startStopBtn').innerText = 'Stop';
    isRunning = true;
  }
}

function lap() {
  if (isRunning) {
    const currentTime = Date.now();
    const lapTime = (currentTime - startTime) / 1000;
    const lapDisplay = formatTime(lapTime);
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapCount++}: ${lapDisplay}`;
    document.getElementById('lapList').appendChild(lapItem);
    startTime = currentTime;
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('startStopBtn').innerText = 'Start';
  document.getElementById('lapList').innerHTML = '';
  isRunning = false;
  lapCount = 1;
}

function updateDisplay() {
  const currentTime = Date.now();
  const elapsedTime = (currentTime - startTime) / 1000;
  const display = formatTime(elapsedTime);
  document.getElementById('display').innerText = display;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const milliseconds = Math.floor((time % 1) * 100);
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}
