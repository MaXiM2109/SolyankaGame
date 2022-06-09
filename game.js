let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

let x=1, y=10
for(let i=0; i<100; i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
    excel.setAttribute("posX", x);
    excel.setAttribute("posY", y);
    x++;
    if(x>10){
        x=1;
        y--;
    }
}

function generateSnake(){
    let posX = Math.round(Math.random()*(10-3)+3);
    let posY = Math.round(Math.random()*(10-1)+1);
    return[posX, posY];
}

let positionSnake = generateSnake();
let snakeBody=[
    document.querySelector(`[posX = "${positionSnake[0]}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-1}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-2}"][posY = "${positionSnake[1]}"]`),
]
function fillSnake(){
for(let i=0; i<snakeBody.length;i++){
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('snakeHead');}

let food;
function spawnFood(){
    function generateFood(){
        let posX = Math.round(Math.random()*(10-1)+1);
        let posY = Math.round(Math.random()*(10-1)+1);
        return[posX, posY];
    }
    do{
        let positionFood = generateFood();
        food=document.querySelector(`[posX = "${positionFood[0]}"][posY = "${positionFood[1]}"]`);
    }
    while(food.classList.contains("snakeBody"))
    food.classList.add('food');
}
spawnFood();

let direction = "right";

function move(){
    let coordinateSnake=[snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();
    if(direction=="right"){
        if(coordinateSnake[0]==10){
            coordinateSnake[0]=0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0]+1}"][posY = "${+coordinateSnake[1]}"]`));
    }
    else if(direction=="left"){
        if(coordinateSnake[0]==1){
            coordinateSnake[0]=11;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0]-1}"][posY = "${+coordinateSnake[1]}"]`));
    }
    else if(direction=="up"){
        if(coordinateSnake[1]==10){
            coordinateSnake[1]=0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0]}"][posY = "${+coordinateSnake[1]+1}"]`));
    }
    else if(direction=="down"){
        if(coordinateSnake[1]==1){
            coordinateSnake[1]=11;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+coordinateSnake[0]}"][posY = "${+coordinateSnake[1]-1}"]`));
    }
    if(snakeBody[0].getAttribute('posX')==food.getAttribute('posX')&& snakeBody[0].getAttribute('posY')==food.getAttribute('posY')){
        food.classList.remove("food");
        spawnFood();
        let x=snakeBody[snakeBody.length-1].getAttribute('posX');
        let y=snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector(`[posX = "${+x}"][posY = "${+y}"]`));
    }
    if(snakeBody[0].classList.contains("snakeBody")){
        clearInterval(moveSnakeInterval);
        snakeBody[0].classList.add('dead');
        setTimeout('alert("Вы проиграли")',100);
    }
    fillSnake();
}

let moveSnakeInterval= setInterval(move,300);

window.addEventListener('keydown',(event)=>{
    let key = event.code;
    if(key=="ArrowRight" && direction!="left"){
        direction="right";
    }else if(key=="ArrowLeft" && direction!="right"){
        direction="left";
    }
    else if(key=="ArrowUp" && direction!="down"){
        direction="up";
    }
    else if(key=="ArrowDown" && direction!="up"){
        direction="down";
    }
})


