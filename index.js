const canvas = document.getElementById("gameCanvas");
const gameScore = document.getElementById("score");
const resetButton = document.getElementById("resetGame");
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
resetButton.addEventListener("click", resetGame);

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
    nextTick();
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

/*
* @function moveSnake
* @description Moves the snake by adding a new head in the direction of movement
* If the snake eats the food, it grows by not removing the tail
* If the snake doesn't eat the food, it moves by adding a new head and removing the tail
* @returns {void}
*/
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
        score += 1;
        gameScore.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

/*
* @function drawSnake
* @description Draws the snake on the canvas
* @returns {void}
*/
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

/*
* @function changeDirection
* @description Changes the direction of the snake based on the key pressed
* The snake cannot reverse its direction
* @param {object} event - The keydown event object
* @returns {void}
 */
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = yVelocity === -unitSize;
    const goingDown = yVelocity === unitSize;
    const goingRight = xVelocity === unitSize;
    const goingLeft = xVelocity === -unitSize;

    switch (true) {
        case keyPressed === LEFT && !goingRight:
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case keyPressed === UP && !goingDown:
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case keyPressed === RIGHT && !goingLeft:
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case keyPressed === DOWN && !goingUp:
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

/*
 * @function checkGameOver
 * @description Checks if the game is over
 * The game is over if the snake hits the wall or itself
 * @returns {void}
 */
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            running = false;
        }
    }
}

/*
* @function displayGameOver
* @description Displays the game over message
* @returns {void}
*/
function displayGameOver() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
    running = false;
}

/*
* @function resetGame
* @description Resets the game to initial state
* @returns {void}
*/
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
}
