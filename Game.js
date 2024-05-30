var ctx;
var mainField;
var mainFigure;
var gameState;
var pauseCount = 10;
var pauseTicks = pauseCount;
var score;
var speedUpCount = 100;
var speedUpTicks = speedUpCount;

function loadGame(){
    var canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    ctx = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    mainField = new Field(15, 25);
    mainFigure = new Figure(5, 0, 0);

    gameState = 1;
    score = 0;

    mainFigure.dropNew(mainField);

    mainInterval = setInterval(updateGame, 33);
};

function drawText(fnt, color, text, x, y){
    ctx.font = fnt;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

function updateGame(){
    if(gameState == 0){
        drawText("30px Arial", "#00FF00", "Game Over", 30, 100);
        return 0;
    };
    if(gameState == 2){
        drawText("30px Arial", "#0000FF", "Pause", 30, 100);
        return 0;
    };

    if(pauseTicks <= 0){
        pauseTicks = pauseCount;
        mainFigure.moveDown();
        if(mainField.collision(mainFigure)){
            mainFigure.moveUp();
            mainField.plantFigure(mainFigure);
            score += mainField.eraseLines();
            mainFigure.dropNew(mainField);
            if(mainField.collision(mainFigure)){
                gameState = 0;
            }
        }
    }

    if(speedUpTicks <= 0){
        speedUpTicks = speedUpCount;
        pauseCount--;
        if(pauseCount < 1)
            pauseCount = 1;
    };

    mainField.draw();
    mainFigure.draw();

    drawText("25px Arial", "#233344", "Score: " + score + " Speed: " + (10-pauseCount+1), 10, 30)

    pauseTicks--;
    speedUpTicks--;
}