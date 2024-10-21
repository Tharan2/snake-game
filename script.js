let snakePositioni = 4;
let snakePositionj = 4;
let snakeEndi = 5;
let snakeEndj = 5;
let snakeSize = 0;
let foodi;
let foodj;
let boxarray =[];
let snakeBody = [[5,5]];
let keypressed = 0;

function box() {
  let boxdiv = '<div class="innerbox 0"></div>';
  let boxhtml;
 
  let boxindex = [0];
  for (let i = 1; i < 50; i++) {
    boxdiv += `<div class="innerbox ${i}"></div>`;
    boxindex[i]=0;
  }
  boxhtml = `<div class="outerbox" id="0">${boxdiv}</div>`;
  boxarray.push(boxindex.slice());
  for (let i = 1; i < 50; i++) {
    boxhtml += `<div class="outerbox" id="${i}">${boxdiv}</div>`;
    boxarray.push(boxindex.slice());
  }console.log(document.querySelector(".mainbox").innerHTML);
  document.querySelector(".mainbox").innerHTML = boxhtml;
  randomFood();
  snake(snakePositioni,snakePositionj);
  arraycheck(boxarray);
  
  const snakeMoving = setInterval(()=>snakemove(snakeMoving), 100);
  
  document.addEventListener('keydown', function(event) {
    if(event.key==="ArrowUp"&& keypressed!=2){
      keypressed=1;
    }
    else if(event.key==="ArrowDown"&& keypressed!=1){
      keypressed=2;
    }
    else if(event.key==="ArrowLeft"&& keypressed!=4){
      keypressed=3;
    }
    else if(event.key==="ArrowRight"&& keypressed!=3){
      keypressed=4;
    }
  });
  document.querySelector('.restart-button').addEventListener('click',()=>{location.reload()});
}

function snakemove(snakeMoving){
  if(snakePositioni>=0 && snakePositioni<50 && snakePositionj>=0 && snakePositionj<50){
    if(keypressed == 1){ 
      snakePositioni--;
      snakepositioncheck(snakePositioni, snakePositionj,snakeMoving);
    }
    else if(keypressed == 2){
      snakePositioni++;
      snakepositioncheck(snakePositioni, snakePositionj,snakeMoving);
    }
    else if(keypressed == 3){
      snakePositionj--;
      snakepositioncheck(snakePositioni, snakePositionj,snakeMoving);
    }
    else if(keypressed == 4){
      snakePositionj++;
      snakepositioncheck(snakePositioni, snakePositionj,snakeMoving);
    }

    
    if(snakePositioni === foodi && snakePositionj === foodj){
      snakeSize++;
      randomFood();  
    } else {
      
      let tail = snakeBody.pop(); 
      boxarray[tail[0]][tail[1]] = 0; 
    }

    snakeBody.unshift([snakePositioni, snakePositionj]);
    
    for(let i = 0; i < snakeBody.length; i++){
      let segment = snakeBody[i];
      boxarray[segment[0]][segment[1]] = 1;
    }

    arraycheck();  

  } else {
    console.log("gameover");
    gameover();
    clearInterval(snakeMoving);
  }
  
  document.querySelector(".score").innerHTML=`Score : ${snakeSize}`;
  
  document.querySelector(".gameoverscore").innerHTML=`Score : ${snakeSize}`;
}

function arraycheck(){
  for(let i=0;i<boxarray.length;i++){
    for(let j=0;j<boxarray[i].length;j++){
      if(boxarray[i][j]===0){
        document.getElementById(String(i)).getElementsByClassName(String(j))[0].style.backgroundColor = "black";
      }
      else if(boxarray[i][j]===1){
        document.getElementById(String(i)).getElementsByClassName(String(j))[0].style.backgroundColor = "green";
      }
      else if(boxarray[i][j]===2){
        document.getElementById(String(i)).getElementsByClassName(String(j))[0].style.backgroundColor = "red";
      }
      else if(boxarray[i][j]===3){

      }
    }
  }
}

function randomFood(){
  foodi = Math.floor(Math.random()*50);
  foodj = Math.floor(Math.random()*50);
  if(boxarray[foodi][foodj] === 1){
    randomFood(boxarray);
  }
  boxarray[foodi][foodj] = 2;
  
}
function snakepositioncheck(snakePositioni, snakePositionj,snakeMoving){
  for(let i=0;i<snakeBody.length;i++){
    for(let j=0;j<snakeBody[i].length;j++){
     
      if (snakePositioni==snakeBody[i][j]&& snakePositionj==snakeBody[i][j+1]){
        clearInterval(snakeMoving);
        gameover();
      }
    }
  }
}
function snake(){
  boxarray[snakePositioni][snakePositionj]=1;
}
function restart(snakeMoving){
   snakePositioni = 5;
   snakePositionj = 5;
   snakeEndi = 5;
   snakeEndj = 5;
   snakeSize = 0;
   boxarray =[];
   snakeBody = [[5,5]];
   keypressed = 0;
   box();
}
function gameover(){
  const dis = document.querySelector('.gameOver');
  dis.style.display='flex';
}
box();
