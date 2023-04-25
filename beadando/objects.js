import {ctx,rows,columns,blockSize,boardColor} from "./board.js";
import {Random} from "./randomNumber.js";
const Snake=
{
    headCordinateX:null,
    headCordinateY:null,

    bodyCordinates:Array(99,Number),

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
    cordinateX:Array(4,Number),
    cordinateY:Array(4,Number),

    color:"orange",

    number:null,
    speed:1000
}

function PlaceFood() {
    Food.cordinateX=Random(0,rows)*blockSize;
    Food.cordinateY=Random(0,columns)*blockSize;
    while(Food.cordinateX==Poison.cordinateX || Food.cordinateX==Snake.headCordinateX || SnakeBodyCollisonX(Food.cordinateX) || PoisonCollisonX(Food.cordinateX))
        {Food.cordinateX=Random(0,rows)*blockSize}
    while(Food.cordinateY==Poison.cordinateY || Food.cordinateY==Snake.headCordinateY || SnakeBodyCollisonY(Food.cordinateY) || PoisonCollisonY(Food.cordinateY))
        {Food.cordinateY=Random(0,columns)*blockSize}
    ctx.fillStyle=Food.color;
    ctx.fillRect(Food.cordinateX,Food.cordinateY,blockSize,blockSize)
}

function PlacePoison() {
    Poison.number=Random(1,5);
    for (let i = 0; i < Poison.number; i++) {
        Poison.cordinateX[i]=Random(0,rows)*blockSize;
        Poison.cordinateY[i]=Random(0,columns)*blockSize;
        while(Poison.cordinateX[i]==Food.cordinateX || Poison.cordinateX[i]==Snake.headCordinateX || SnakeBodyCollisonX(Poison.cordinateX[i]))
            {Poison.cordinateX[i]=Random(0,rows)*blockSize}
        while(Poison.cordinateY[i]==Food.cordinateY || Poison.cordinateY[i]==Snake.headCordinateY || SnakeBodyCollisonY(Poison.cordinateY[i]))
            {Poison.cordinateY[i]=Random(0,columns)*blockSize}
    }
    for (let i = 0; i < Poison.number; i++) {
        ctx.fillStyle=Poison.color;
        ctx.fillRect(Poison.cordinateX[i],Poison.cordinateY[i],blockSize,blockSize)
    }
    
}

function PlaceSnakeHead() {
    Snake.headCordinateX=Random(0,rows)*blockSize;
    Snake.headCordinateY=Random(0,columns)*blockSize;
    while(Snake.headCordinateX==Poison.cordinateX || Snake.headCordinateX==Food.cordinateX || PoisonCollisonX(Snake.headCordinateX))
        {Snake.headCordinateX=Random(0,rows)*blockSize}
    while(Snake.headCordinateY==Poison.cordinateY || Snake.headCordinateY==Food.cordinateY || PoisonCollisonY(Snake.headCordinateY))
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

function PoisonCollisonX(objectCordinate) {
    for (let i = 0; i < Poison.cordinateX.length; i++) {
        if(Poison.cordinateX[i]==objectCordinate){return true}
    }
    return false
}

function PoisonCollisonY(objectCordinate) {
    for (let i = 0; i < Poison.cordinateY.length; i++) {
        if(Poison.cordinateY[i]==objectCordinate){return true}
    }
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
    ctx.fillStyle=boardColor;
    for (let i = 0; i < Poison.number; i++) {
        ctx.fillRect(Poison.cordinateX[i],Poison.cordinateY[i],blockSize,blockSize)
    }
    PlacePoison()
}
addEventListener("keyup",SnakeandPoisonVelocity)

export {PlaceFood,PlacePoison,PlaceSnakeHead,SnakeMove,PoisonMove,Snake,Food,Poison}