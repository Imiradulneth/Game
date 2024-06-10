function controller(event) {

 if(event.key=="Enter"){
    if (runWorker == 0){
    run();
    runSound.play();
    updateScore();
    backgroundMove();
    flameMarginLeft.forEach(createFlame);
    }
 }

    if(event.key==" "){
       if (jumpWorker ==0){
        if(runWorker != 0){
               clearInterval(runWorker);
               runSound.pause();   
        jump();
        jumpSound.play();
         }
       }
    }        

    
}
var runImage=1;
var runWorker=0;
var runSound= new Audio("run.mp3")
runSound.loop=true;


function run(){
    runWorker = setInterval(
        ()=> {
        runImage=runImage+1
      
     if(runImage==9){
        runImage =1;}
   
     document.getElementById("boy").src ="run" + runImage + ".png";
   }, 150);
}

var jumpImage = 1;
var jumpWorker = 0;
var jumpMarginTop= 310;
var jumpSound= new Audio("jump.mp3")

 function jump(){

    jumpWorker = setInterval(
        ()=>{
            jumpImage = jumpImage + 1;

            if (jumpImage < 8){
                jumpMarginTop=jumpMarginTop - 15;
                document.getElementById("boy").style.marginTop = jumpMarginTop + "px"
            }
       if(jumpImage>7){
        jumpMarginTop=jumpMarginTop + 15;
        document.getElementById("boy").style.marginTop = jumpMarginTop + "px"
       }
           

            if(jumpImage == 13){
                jumpImage = 1;
                clearInterval(jumpWorker);
                run();
                runSound.play();
                jumpWorker =0;
            }
            document.getElementById("boy").src ="jump" + jumpImage+ ".png";
        },150
    );
 }

 var score = 0;
 var scoreWorker =0;


    function updateScore(){

         scoreWorker = setInterval(
         ()=>{
         score =score + 10

         if(score==4000){
            alert("!*-*! You Won !*-*!");
            window.location.reload();
         }

         document.getElementById("score").innerHTML = score;

        },100
    );
}

    var backgroundX = 0;
    var backgroundWorker = 0;


    function backgroundMove(){

        backgroundWorker = setInterval(
            ()=>{

                backgroundX = backgroundX - 10;
                document.getElementById("background").style.backgroundPositionX=backgroundX+"px";
            },150
        );
    }
     
var deadImage = 1;
var deadWorker = 0;
var deadSound = new Audio("dead.mp3");

function dead(){
    deadWorker= setInterval( ()=>{

        deadImage = deadImage + 1;
    if(deadImage ==11){
      deadImage = 1;
      clearInterval(deadWorker);
      alert("!>__<!   Game Over You Lost  !>__<!?");
      window.location.reload();
    }
    document.getElementById("boy").src = "dead"+ deadImage + ".png";
},150
    ); 

}
 

var flameMarginLeft = [500,1000,1500,2000,2500,2750,3000,3250,3500,3750,3850,3950,4000];
var flameWorker = 0;

function createFlame(x){
    var f = document.createElement("img");
    f.src = "flame.gif";
    f.className ="flame";
    f.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(f);

    flameWorker = setInterval(()=>{

        if(flameWorker != 0){
            x = x - 10;
            f.style.marginLeft = x + "px";
        }

           if(x == 140){
              if(jumpWorker == 0){
                clearInterval(runWorker);
                clearInterval(scoreWorker);
                clearInterval(backgroundWorker);
                clearInterval(flameWorker);
                flameWorker = 0;

                runSound.pause();
                dead();
                deadSound.play();
              }
           }
    },100
);
}



 