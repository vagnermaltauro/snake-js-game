const canvas = document.getElementById("gameCanvas");
const gameScore = document.getElementById("score");
const resetButton = document.getElementById("resetButton");
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

/*
 * @function gameLoop
 * @description Main game loop
 * @returns {void}
 */
function gameStart() {
    running = true;
    gameScore.textContent = score;
    createFood();
    drawFood();
}

/**
 * Executes the next tick of the game loop.
 * If the game is running, it schedules the next tick after 75 milliseconds.
 * During each tick, it clears the board, draws the food, moves the snake, draws the snake, and checks for game over.
 * If the game is not running, it displays the game over message.
 */
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver();
    }
}

/*
 * @function clearBoard
 * @description Clears the canvas
 * @returns {void}
 */
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

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

/*
* @function drawFood
* @description Draws the food on the canvas
* @returns {void}
*/
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    console.log({
        snake0X: snake[0].x,
        snake0Y: snake[0].y,
        xVelocity: xVelocity,
        yVelocity: yVelocity
    })

    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);

    const foodEaten = snake[0].x === foodX && snake[0].y === foodY;
    if (foodEaten) {
        score+=1;
        gameScore.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

function changeDirection() { }

function checkGameOver() { }

function displayGameOver() { }

function resetGame() { }
