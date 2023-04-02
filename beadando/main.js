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

let win = false
let gameOver = false
let updateInterval = setInterval(Update, speed)

window.onload = function () {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = columns * blockSize
    context = board.getContext("2d")

    PlaceFood()
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
        win = false
    }

    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

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

    // if (e.code == "ArrowUp" && velocityY != 1) {
    //     velocityX = 0
    //     velocityY = -1
    // }
    // else if (e.code == "ArrowDown" && velocityY != -1) {
    //     velocityX = 0
    //     velocityY = 1
    // }
    // else if (e.code == "ArrowLeft" && velocityX != 1) {
    //     velocityX = -1
    //     velocityY = 0
    // }
    // else if (e.code == "ArrowRight" && velocityX != -1) {
    //     velocityX = 1
    //     velocityY = 0
    // }
}

function PlaceFood() {
    foodX = Math.floor(Math.random() * rows) * blockSize
    foodY = Math.floor(Math.random() * columns) * blockSize
    document.getElementById("score").innerHTML = score
}