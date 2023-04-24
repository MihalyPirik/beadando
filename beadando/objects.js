import {ctx,rows,columns,blockSize,boardColor} from "./board.js";
import {Random} from "./randomNumber.js";
const Snake=
{
    headCordinateX:null,
    headCordinateY:null,

    bodyCordinates:[],

    velocityX:null,
    velocityY:null,

    color:"green"
}

const Food=
{
    cordinateX:null,
    cordinateY:null,

    color:"red"
}

const Poison=
{
    cordinateX:null,
    cordinateY:null,

    velocityX:null,
    velocityY:null,

    color:"orange"
}

function PlaceFood() {
    Food.cordinateX=Random(0,rows)*blockSize;
    Food.cordinateY=Random(0,columns)*blockSize;
    while(Food.cordinateX==Poison.cordinateX || Food.cordinateX==Snake.headCordinateX || SnakeBodyCollisonX(Food.cordinateX))
        {Food.cordinateX=Random(0,rows)*blockSize}
    while(Food.cordinateY==Poison.cordinateY || Food.cordinateY==Snake.headCordinateY || SnakeBodyCollisonY(Food.cordinateY))
        {Food.cordinateY=Random(0,columns)*blockSize}
    ctx.fillStyle=Food.color;
    ctx.fillRect(Food.cordinateX,Food.cordinateY,blockSize,blockSize)
}

function PlacePoison() {
    Poison.cordinateX=Random(0,rows)*blockSize;
    Poison.cordinateY=Random(0,columns)*blockSize;
    while(Poison.cordinateX==Food.cordinateX || Poison.cordinateX==Snake.headCordinateX || SnakeBodyCollisonX(Poison.cordinateX))
        {Poison.cordinateX=Random(0,rows)*blockSize}
    while(Poison.cordinateY==Food.cordinateY || Poison.cordinateY==Snake.headCordinateY || SnakeBodyCollisonY(Poison.cordinateY))
        {Poison.cordinateY=Random(0,columns)*blockSize}
    ctx.fillStyle=Poison.color;
    ctx.fillRect(Poison.cordinateX,Poison.cordinateY,blockSize,blockSize)
}

function PlaceSnakeHead() {
    Snake.headCordinateX=Random(0,rows)*blockSize;
    Snake.headCordinateY=Random(0,columns)*blockSize;
    while(Snake.headCordinateX==Poison.cordinateX || Snake.headCordinateX==Food.cordinateX)
        {Snake.headCordinateX=Random(0,rows)*blockSize}
    while(Snake.headCordinateY==Poison.cordinateY || Snake.headCordinateY==Food.cordinateY)
        {Snake.headCordinateY=Random(0,columns)*blockSize}
    ctx.fillStyle=Snake.color;
    ctx.fillRect(Snake.headCordinateX,Snake.headCordinateY,blockSize,blockSize)
    Snake.bodyCordinates=[]
}

function SnakeBodyCollisonX(objectCordinate) {
    if(Snake.bodyCordinates.length!=0){
    for (const bodyPart of Snake.bodyCordinates) {
        if(objectCordinate==bodyPart[0]){return true}
    }}
    return false
}

function SnakeBodyCollisonY(objectCordinate) {
    if(Snake.bodyCordinates.length!=0){
    for (const bodyPart of Snake.bodyCordinates) {
        if(objectCordinate==bodyPart[1]){return true}
    }}
    return false
}

function SnakeandPoisonVelocity(key) {
    switch (key.code) {
        case "ArrowUp":
            if (Snake.velocityY != 1) { Snake.velocityX = 0; Snake.velocityY = -1 }
            break;
        case "ArrowDown":
            if (Snake.velocityY != -1) { Snake.velocityX = 0; Snake.velocityY = 1 }
            break;
        case "ArrowLeft":
            if (Snake.velocityX != 1) { Snake.velocityX = -1; Snake.velocityY = 0 }
            break;
        case "ArrowRight":
            if (Snake.velocityX != -1) { Snake.velocityX = 1; Snake.velocityY = 0 }
            break;
        default:
            break;
    }
    Poison.velocityX=Random(-1,2);
    Poison.velocityY=Random(-1,2)
}
function SnakeMove() {
    ctx.fillStyle=boardColor;
    if(Snake.bodyCordinates.length==0)
    {
        ctx.fillRect(Snake.headCordinateX,Snake.headCordinateY,blockSize,blockSize)
    }
    else
    {
        ctx.fillRect(Snake.bodyCordinates[Snake.bodyCordinates.length-1][0],Snake.bodyCordinates[Snake.bodyCordinates.length-1][1],blockSize,blockSize)
    }
    for (let i = Snake.bodyCordinates.length-1; i > 0; i--) {
        Snake.bodyCordinates[i]=Snake.bodyCordinates[i-1]
    }
    if(Snake.bodyCordinates.length){Snake.bodyCordinates[0]=[Snake.headCordinateX,Snake.headCordinateY]}
    Snake.headCordinateX+=blockSize*Snake.velocityX;
    Snake.headCordinateY+=blockSize*Snake.velocityY;
    ctx.fillStyle=Snake.color;
    ctx.fillRect(Snake.headCordinateX,Snake.headCordinateY,blockSize,blockSize)
}

function PoisonMove() {
    if(Poison.velocityX!=null && Poison.velocityY!=null){
    Poison.velocityX=Random(-1,2);
    Poison.velocityY=Random(-1,2);
    let newPoisonCordinateX=Poison.cordinateX+Poison.velocityX*blockSize,
    newPoisonCordinateY=Poison.cordinateY+Poison.velocityY*blockSize;
    while(newPoisonCordinateX==Food.cordinateX || SnakeBodyCollisonX(newPoisonCordinateX) || newPoisonCordinateX>rows*blockSize || newPoisonCordinateX<0)
        {Poison.velocityX=Random(-1,2);newPoisonCordinateX=Poison.cordinateX+Poison.velocityX*blockSize}
    while(newPoisonCordinateY==Food.cordinateY || SnakeBodyCollisonY(newPoisonCordinateY) || newPoisonCordinateY>rows*blockSize || newPoisonCordinateY<0)
        {Poison.velocityY=Random(-1,2);newPoisonCordinateY=Poison.cordinateY+Poison.velocityY*blockSize}
    ctx.fillStyle=boardColor;
    ctx.fillRect(Poison.cordinateX,Poison.cordinateY,blockSize,blockSize)
    ctx.fillStyle=Poison.color;
    ctx.fillRect(newPoisonCordinateX,newPoisonCordinateY,blockSize,blockSize)
    Poison.cordinateX=newPoisonCordinateX;
    Poison.cordinateY=newPoisonCordinateY}
}
addEventListener("keyup",SnakeandPoisonVelocity)

export {PlaceFood,PlacePoison,PlaceSnakeHead,SnakeMove,PoisonMove,Snake,Food,Poison}