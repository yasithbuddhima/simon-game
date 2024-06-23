let buttonColors=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level = 0 ;
let started = false ;

function nextSequence() {
    userClickedPattern=[];
    randomNumber=Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);

    playSound(randomChosenColour);

    level++;
    console.log(level)
    console.log(gamePattern)
    
    $("#level-title").text("Level "+level);
    
}



function checkAnswer(currenLevel){
    if (userClickedPattern[currenLevel] === gamePattern[currenLevel]) {
        console.log("success");
        console.log(userClickedPattern)
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            
        }
        
    }
    else {
        console.log("wrong");
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    level = 0 ;
    started = false ;
}




function playSound(name) {
    let audio =new Audio("sounds/"+name+".mp3");
    audio.play()
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}




$(document).keypress(function(){
    if (started == false) {
        nextSequence();
        $("#level-title").text("Level "+ level);
        started = true;
       
    }
});






$(".btn").click(function(){
    
    let userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    
    checkAnswer( userClickedPattern.length - 1)
    
});




$(".startBtn").click(function(){
    startOver();
    setTimeout(function(){
        nextSequence();
    },100);
});














