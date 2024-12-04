const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameWidth = canvas.width;
const gameHeight = canvas.height;

const boardBackground = "white";
const snakeColor = "lightgreen";
const foodColor = "red";
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

document.addEventListener("keydown", (e) => {
    console.log('pressed', e.key);
});
