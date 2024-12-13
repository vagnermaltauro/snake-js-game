const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameWidth = canvas.width;
const gameHeight = canvas.height;

const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);

gameStart();

function gameStart() { }

function nextTick() { }

function clearBoard() { }

function createFood() { }

function drawFood() { }

function moveSnake() { }

function drawSnake() { }

function changeDirection() { }

function checkGameOver() { }

function displayGameOver() { }

function resetGame() { }
