const gifPath = {
    "Push-ups": "gif/push-up.gif",
    Squats: "gif/squat.gif",
};
const core = ["Push-ups", "Squats"];

// 30, 46, 12, 30 = 30 minutes
const totalExercises = 30;
const exerciseDur = 46;
const restDur = 12;
const roundDur = 30;

let completed = 0;
let exercises = [];
for (let i = 0; i < totalExercises; i++) {
    exercises.push(core[i % core.length]);
}

// shuffle exercises
exercises.sort(() => Math.random() - 0.5);

// DOM
const signElm = document.getElementById("sign");
const workoutElm = document.querySelector("main");
const exerciseNameElm = document.getElementById("name");
const exerciseGifElm = document.getElementById("workout-gif");
const timerElm = document.getElementById("timer");
const progressElm = document.getElementById("progress");
const progressDiv = document.querySelector("#progress-container");
const btn = document.querySelector("button");

btn.addEventListener("click", start);

function start() {
    workoutElm.classList.toggle("hidden");
    progressElm.textContent = totalExercises;
    btn.classList.add("hidden");
    document.getElementById("trainer").classList.add("hidden");
    progressDiv.classList.remove("hidden");
    nextExercise();

    resizeGif();
}
function nextExercise() {
    let exerciseName = exercises[completed];

    workoutElm.className = "exercise";
    exerciseNameElm.textContent = exerciseName;

    exerciseGifElm.src = gifPath[exerciseName];

    exerciseGifElm.classList.toggle("hidden");

    let duration = exerciseDur;
    timerElm.textContent = duration;
    let timer = setInterval(() => {
        duration--;
        timerElm.textContent = duration;
        if (duration <= 0) {
            clearInterval(timer);
            completed++;
            progressElm.textContent = totalExercises - completed;
            if (completed < totalExercises) {
                if (completed % 10) exerciseRest();
                else roundRest();
            } else {
                progressDiv.classList.add("completed");
                progressElm.textContent = "training completed";

                workoutElm.classList.toggle("hidden");
                exerciseGifElm.classList.toggle("hidden");
                signElm.classList.toggle("hidden");
            }
        }
    }, 1000);
}
function exerciseRest() {
    workoutElm.className = "rest";
    exerciseGifElm.classList.toggle("hidden");

    exerciseNameElm.textContent = "REST, REST, REST, REST";
    let duration = restDur;
    timerElm.textContent = duration;
    let timer = setInterval(() => {
        duration--;
        timerElm.textContent = duration;
        if (duration <= 10 && completed < totalExercises) {
            timerElm.textContent += " >>> " + exercises[completed];
        }
        if (duration <= 0) {
            clearInterval(timer);
            nextExercise();
        }
    }, 1000);
}
function roundRest() {
    workoutElm.className = "roundrest";
    exerciseGifElm.classList.toggle("hidden");

    exerciseNameElm.textContent =
        "ROUND " + Math.floor(completed / 10) + " REST";
    let duration = roundDur;
    timerElm.textContent = duration;
    let timer = setInterval(() => {
        duration--;
        timerElm.textContent = duration;
        if (duration <= 10 && completed < totalExercises) {
            timerElm.textContent += " (" + exercises[completed] + ")";
        }
        if (duration <= 0) {
            clearInterval(timer);
            nextExercise();
        }
    }, 1000);
}

function resizeGif() {
    // default is 320 px
    // shrink when viewport height is scrollable
    // resize by decreasing the difference of excess from 320
    const excess = document.body.scrollHeight - document.body.clientHeight;
    exerciseGifElm.style.maxWidth = (320 - excess) + "px";
    exerciseGifElm.style.height = "auto";
}

// listen to window resizing
window.addEventListener("resize", resizeGif);
