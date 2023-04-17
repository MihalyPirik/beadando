let blockSize = 25
let rows = 20
let columns = 20
let board
let context
let speed = 200
let score = 0
let maxScore = 0

let velocityX = 0
let velocityY = 0
let snakeX = blockSize * 5
let snakeY = blockSize * 5
let snakeBody = []

let foodX
let foodY

let poisonX
let poisonY

let win = false
let gameOver = false
let updateInterval = setInterval(Update, speed)
setInterval(poisonmove,400)



function poisonmove() {
    let noveltX=Math.round(Math.random()*2-1)*blockSize,
    noveltY=Math.round(Math.random()*2-1)*blockSize,
    newPosionX=poisonX+noveltX,
    newPosionY=poisonY+noveltY
while(newPosionX < 0 || newPosionX > columns * blockSize || newPosionX==foodX || newPosionY < 0 || newPosionY > columns * blockSize || newPosionY==foodY
  || noveltX==0 || noveltY==0)
{
  noveltX=Math.round(Math.random()*2-1)*blockSize
  noveltY=Math.round(Math.random()*2-1)*blockSize
  newPosionX=poisonX+noveltX
  newPosionY=poisonY+noveltY
}
context.fillStyle="black"
context.fillRect(poisonX,poisonY,blockSize,blockSize)
context.fillStyle="orange"
poisonX=newPosionX
poisonY=newPosionY
context.fillRect(poisonX,poisonY,blockSize,blockSize)
}

window.onload = function () {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = columns * blockSize
    context = board.getContext("2d")

    PlaceFood()
    PlacePoison()
    document.addEventListener("keyup", changeDirection)
    updateInterval
}

function Update() {
    if (gameOver) {
        if (score > maxScore) {
            maxScore = score
            document.getElementById("maxScore").innerHTML = maxScore
        }
        score = 0
        velocityX = 0
        velocityY = 0
        snakeX = blockSize * 5
        snakeY = blockSize * 5
        snakeBody = []
        PlaceFood()
        PlacePoison()
        gameOver = false
    }

    if (win) {
        if (score > maxScore) {
            maxScore = score
            document.getElementById("maxScore").innerHTML = maxScore
        }
        score = 0
        velocityX = 0
        velocityY = 0
        snakeX = blockSize * 5
        snakeY = blockSize * 5
        snakeBody = []
        PlaceFood()
        PlacePoison()
        win = false
    }

    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    context.fillStyle = "orange"
    context.fillRect(poisonX, poisonY, blockSize, blockSize)
    
    



    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = "green"
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if (snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true
        document.getElementById("score").innerHTML = score
        alert("Game Over")
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            document.getElementById("score").innerHTML = score
            alert("Game Over")
        }
    }

    if (score + 1 == 400) {
        win = true
        document.getElementById("score").innerHTML = score
        alert("Win")
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        score++
        PlaceFood()
        PlacePoison()
    }

    if (snakeX == poisonX && snakeY == poisonY) {
        gameOver = true
        document.getElementById("score").innerHTML = score
        alert("Game Over")
    }
}

function changeDirection(e) {


    switch (e.code) {
        case "ArrowUp":
            if (velocityY != 1) { velocityX = 0; velocityY = -1 }
            break;
        case "ArrowDown":
            if (velocityY != -1) { velocityX = 0; velocityY = 1 }
            break;
        case "ArrowLeft":
            if (velocityX != 1) { velocityX = -1; velocityY = 0 }
            break;
        case "ArrowRight":
            if (velocityX != -1) { velocityX = 1; velocityY = 0 }
            break;
        default:
            break;
    }

}

function PlaceFood() {
    foodX = Math.floor(Math.random() * rows) * blockSize
    foodY = Math.floor(Math.random() * columns) * blockSize
    document.getElementById("score").innerHTML = score
}

function PlacePoison() {
    poisonX = Math.floor(Math.random() * rows) * blockSize
    poisonY = Math.floor(Math.random() * columns) * blockSize
    document.getElementById("score").innerHTML = score
}