const gifPath = {
    "Push-ups": "demos/push-up.gif",
    Squats: "demos/squat.gif",
    // Burpees: "demos/burpee.gif",
    // Lunges: "demos/lunges.gif",
    // Plank: "png/plank.png",
};

const totalExercises = 30;
const exerciseDur = 46;
const restDur = 12;
const roundDur = 30;

// CORE

const core = ["Push-ups", "Squats"];

// CORE

let completed = 0;
let exercises = [];
for (let i = 0; i < totalExercises; i++) {
    exercises.push(core[i % core.length]);
}

// shuffle exercises
exercises.sort(() => Math.random() - 0.5);

// DOM
const workoutElm = document.getElementById("workout-ui");
const exerciseNameElm = document.getElementById("name");
const exerciseGifElm = document.getElementById("workout-gif");
const timerElm = document.getElementById("timer");
const progressElm = document.getElementById("progress");
const reportElms = document.querySelectorAll(
    "#progress-container, #progress-container *"
);
const supportLink = document.querySelector("a");
const btn = document.querySelector("button");

btn.addEventListener("click", start);

function start() {
    workoutElm.classList.toggle("hidden");
    progressElm.textContent = totalExercises;
    btn.style.display = "none";
    nextExercise();
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
            if (completed % 10) {
                exerciseRest();
            } else {
                if (completed < totalExercises) {
                    roundRest();
                } else {
                    reportElms.forEach((elm) => {
                        elm.style.backgroundColor = "yellow";
                        elm.style.color = "black";
                    });

                    workoutElm.classList.toggle("hidden");
                    exerciseGifElm.classList.toggle("hidden");
                    supportLink.style.display = "flex";
                }
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
            timerElm.textContent += " (" + exercises[completed] + ")";
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
