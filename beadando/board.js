const board=document.getElementById("board"),
ctx=board.getContext("2d"),
blockSize=25,
boardColor="black",
rows=20,
speed=200,
columns=20;

export function SetBoard()
{
    ctx.fillStyle=boardColor;
    board.width=rows*blockSize;
    board.height=columns*blockSize;
    ctx.fillRect(0,0,board.width,board.height)
}

export {ctx,blockSize,rows,columns,boardColor,speed}