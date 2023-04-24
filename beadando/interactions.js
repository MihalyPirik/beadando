import { blockSize, boardColor, columns, ctx, rows } from "./board.js";
import { Snake, Food, Poison, PlaceFood, PlacePoison, PlaceSnakeHead } from "./objects.js";

let score=0,maxScore=0;

function FoodEffect() {
    if(Snake.headCordinateX==Food.cordinateX && Snake.headCordinateY==Food.cordinateY)
    {
        score++;
        document.getElementById("score").innerText=score;
        Snake.bodyCordinates.push([0,0])
        PlaceFood()
        ctx.fillStyle=boardColor;
        ctx.fillRect(Poison.cordinateX,Poison.cordinateY,blockSize,blockSize)
    }
}
function SetInitialStage() {
    Snake.bodyCordinates=[];
    Snake.velocityX=null;
    Snake.velocityY=null;
    Poison.cordinateX=Array(4,Number);
    Poison.cordinateY=Array(4,Number);
    if(maxScore==0){document.getElementById("maxScore").innerText=score;maxScore=score}
    else{if(score>maxScore){document.getElementById("maxScore").innerText=score;maxScore=score}}
    score=0;
    document.getElementById("score").innerText=0;
    ctx.fillStyle=boardColor;
    ctx.fillRect(0,0,rows*blockSize,columns*blockSize)
    PlaceFood()
    PlacePoison()
    PlaceSnakeHead()
}
function SnakeBodyCollide() {
    for (let i = 0; i < Snake.bodyCordinates.length; i++) {
        if(Snake.bodyCordinates[i][0]==Snake.headCordinateX && Snake.bodyCordinates[i][1]==Snake.headCordinateY)
        {
            alert("Game Over!");
            SetInitialStage();
            break
        }
    }
}
function OutsideTheBoard() {
    if(Snake.headCordinateX<0 || Snake.headCordinateY<0 || Snake.headCordinateX>=rows*blockSize || Snake.headCordinateY>=columns*blockSize)
    {
        alert("Game Over!");
        SetInitialStage()
    }
}
function PoisonEffect() {
    for (let i = 0; i < Poison.number; i++) {
        if(Snake.headCordinateX==Poison.cordinateX[i] && Snake.headCordinateY==Poison.cordinateY[i])
        {
            alert("Game Over!");
            SetInitialStage();
            break
        }  
    }
}

function Win() {
    if(score>=100){
        alert("Win!");
        SetInitialStage();
        maxScore=0;
        document.getElementById("maxScore").innerText=0;
    }
}
export {FoodEffect,SnakeBodyCollide,OutsideTheBoard,PoisonEffect,Win}