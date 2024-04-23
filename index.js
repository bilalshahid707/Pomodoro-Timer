const minutes = document.querySelector(".minutes-count");
const seconds = document.querySelector(".seconds-count");
const startButton = document.querySelector(".start-btn");
const resetButton = document.querySelector(".reset-btn");
const stopButton = document.querySelector(".stop-btn");
const statusText = document.querySelectorAll(".status-text");

let breakCounter = 0;
let checkBreak = false;
let intervalStopped=false;
let shortBreakTimer = 5;
let longBreakTimer = 20;
let startingMinutes = 25;
let startingSeconds = 60;


updateTimerDisplay();
function pomodoro() {
  if (intervalStopped===true) {
    timerInterval = setInterval(startTimer, 1000);
    intervalStopped=false
  } else {
    startingMinutes--;
    startingSeconds--;
    timerInterval = setInterval(startTimer, 1000);
  }
}

function startTimer() {
  startButton.disabled = true;
  // updating display when minutes or seconds are <10
  minutes.innerHTML =
    startingMinutes < 10 ? "0" + startingMinutes : startingMinutes;
  seconds.innerHTML =
    startingSeconds < 10 ? "0" + startingSeconds : startingSeconds;

  startingSeconds--;
  if (startingSeconds === 0) {
    startingSeconds = 60;
    startingMinutes--;
    if (startingMinutes === -1) {
      startButton.disabled = false;
      clearInterval(timerInterval);
      if (breakCounter < 4 && checkBreak !== true) {
        shortBreak();
      } else if (breakCounter === 4 && checkBreak !== true) {
        longBreak();
      } else {
        work();
      }
    }
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  intervalStopped = true;
  startButton.disabled = false;
}

function reset() {
  if (intervalStopped) {
    intervalStopped=false
  }
  startButton.disabled = false;
  clearInterval(timerInterval);
  startingMinutes = 25;
  startingSeconds = 60;
  breakCounter = 0;
  updateTimerDisplay();
  workStatusAnimation("Work");
}

function work() {
  startingMinutes = 25;
  updateTimerDisplay();
  checkBreak = false;
  workStatusAnimation("Work");
}
function shortBreak() {
  startingMinutes = shortBreakTimer;
  updateTimerDisplay();
  breakCounter++;
  checkBreak = true;
  workStatusAnimation("Short Break");
}
function longBreak() {
  startingMinutes = longBreakTimer;
  updateTimerDisplay();
  breakCounter++;
  breakCounter = 0;
  checkBreak = true;
  workStatusAnimation("Long Break");
}

// will call this function for every new interval
function updateTimerDisplay() {
  minutes.innerHTML =
    startingMinutes < 10 ? "0" + startingMinutes : startingMinutes;
  seconds.innerHTML = "00";
}

function workStatusAnimation(workState) {
  statusText.forEach(text=>{
    if (text.innerHTML===workState) {
      text.classList.add("active-status");
    } else {
      text.classList.remove("active-status");
    }
  })
}

startButton.addEventListener("click", pomodoro);
resetButton.addEventListener("click", reset);
stopButton.addEventListener("click", stopTimer);
