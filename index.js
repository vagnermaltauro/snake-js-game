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
drawFood();

function gameStart() { }

function nextTick() { }

function clearBoard() { }

/**
 * @function createFood
 * @description Generates food at a random position aligned to the game grid
 * The position is calculated to ensure:
 * 1. Food spawns within game boundaries
 * 2. Food aligns perfectly with snake movement grid
 * 3. Food won't spawn partially outside the canvas
 * @returns {void}
 */
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameHeight - unitSize)
    console.log(foodX, foodY)
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() { }

function drawSnake() { }

function changeDirection() { }

function checkGameOver() { }

function displayGameOver() { }

function resetGame() { }
