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
createFood();

function gameStart() { }

function nextTick() { }

function clearBoard() { }

/*
* Create a random food location
* The food should be placed at a random location on the game board
* The location should be a multiple of the unit size
*/
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameHeight - unitSize)
    console.log(foodX)
}

function drawFood() { }

function moveSnake() { }

function drawSnake() { }

function changeDirection() { }

function checkGameOver() { }

function displayGameOver() { }

function resetGame() { }
