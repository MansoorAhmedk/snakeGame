const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let speedx = 0;
let speedy = 0;
let score = 0;
let gameOver = false;

// Snake Function
function drawSnake(){
    ctx.fillStyle = "green";
    snake.forEach((segment)=>{
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

}

// Food Function
function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

}

// moveSnake Function
function moveSnake(){
    const head = { x: snake[0].x + speedx, y: snake[0].y + speedy}
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        createFood();
        score++;
    }else{
        snake.pop();
    }

}

// CreateFood Function
function createFood(){
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    snake.forEach((segment)=>{
        if(segment.x === food.x && segment.y === food.y){
            createFood();
        }
    });
}

// Check Game Over Function
function checkGameOver(){
    if(
        snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount || checkSnakeCollision()
    ){
        gameOver = true;
        clearInterval(gameLoop);
        showGameOverScreen();
    }

}

// Check Snake Collision Function
function checkSnakeCollision(){
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;

}

// change Direction
function changeDirection(event){
    const key = event.keyCode;
    if (key === 37 && speedx === 0) { // Left arrow
        speedx = -1;
        speedy = 0;
    } else if (key === 38 && speedy === 0) { // Up arrow
        speedx = 0;
        speedy = -1;
    } else if (key === 39 && speedx === 0) { // Right arrow
        speedx = 1;
        speedy = 0;
    } else if (key === 40 && speedy === 0) { // Down arrow
        speedx = 0;
        speedy = 1;
    }
}

//  show game over screen function 
function showGameOverScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2);
    ctx.fillText("Press Space to Play Again", canvas.width / 2, canvas.height / 2 + 30);
}

// restart Game Function
function restartGame(){
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    speedx = 0;
    speedy = 0;
    score = 0;
    gameOver = false;
    createFood();
    gameLoop = setInterval(updateGame, 100);
}
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 32 && gameOver) { // Space key
        restartGame();
    } else {
        changeDirection(event);
    }
});

// update Game function
function updateGame(){
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawSnake();
        drawFood();
        moveSnake();
        checkGameOver();
        drawScore();
    }
}

// drawGrid function
function drawGrid(){
    ctx.strokeStyle = "#cc2"; // Grid line color
    for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

// draw score function
function drawScore(){
    let result = document.getElementById('result');
    result.innerHTML = score
}


// play Game
createFood();
let gameLoop = setInterval(updateGame, 100);



















