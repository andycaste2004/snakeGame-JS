const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const backgroundColor = "lightgreen";
const foodColor = "red";
const foodColorReverse = "pink";
const snakeColor = "lightblue";
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
let score = 0;
let velocityX = unitSize;
let velocityY = 0;
let foodX;
let foodY;
let foodXReverse;
let foodYReverse;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
];
let running = false;
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();


function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    createFoodReverse();
    drawFood();
    drawReverseFood();
    nextTick();
};
function nextTick(){
    if (running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            drawReverseFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75)
    } else {
        displayGameOver();
    }  
};
function clearBoard(){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
};
function createFood(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0,gameWidth-unitSize);
    foodY = randomFood(0,gameHeight-unitSize);
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function moveSnake(){
    const head = {x:snake[0].x + velocityX, y:snake[0].y + velocityY};
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score+=1;
        scoreText.textContent = score;
        createFood();
    } else if (snake[0].x == foodXReverse && snake[0].y == foodYReverse) {
        createFoodReverse();
    }
    else {
        snake.pop();
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (velocityY == -unitSize);
    const goingDown = (velocityY == unitSize);
    const goingLeft = (velocityX == -unitSize);
    const goingRight = (velocityX == unitSize);

    switch(true) {
        case(keyPressed == LEFT && !goingRight):
            velocityX = -unitSize;
            velocityY = 0;
            break;
        
        case(keyPressed == RIGHT && !goingLeft):
            velocityX = unitSize;
            velocityY = 0;
            break;
        
        case(keyPressed == UP && !goingDown):
            velocityY = -unitSize;
            velocityX = 0;
            break;
        
        case(keyPressed == DOWN && !goingUp):
            velocityY = unitSize;
            velocityX = 0;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
        running = false;
        break;
    }
    switch(true){
        case(snake[0].x >= gameWidth):
        running = false;
        break;
    }
    switch(true){
        case(snake[0].y < 0):
        running = false;
        break;
    }
    switch(true){
        case(snake[0].y >= gameHeight):
        running = false;
        break;
    }
    
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.fillStyle = "blue";
    ctx.font = "bold 30px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Game Over", (gameBoard.width / 2), (gameBoard.height / 2));
    running = false;
};

function resetGame(){
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
    ];
    score = 0;
    gameStart();
};

function drawReverseFood() {
    ctx.fillStyle = foodColorReverse;
    ctx.fillRect(foodXReverse,foodYReverse,unitSize,unitSize);
}

function createFoodReverse(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodXReverse = randomFood(0,gameWidth-unitSize);
    foodYReverse = randomFood(0,gameHeight-unitSize);
};