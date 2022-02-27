var buttonColors = ["red","blue","green","yellow"];
var userPattern = [];
var gamePattern = [];
var isGameOn = false;
var level = 0;
var index = 0;

$(document).keypress(function(){
  if(!isGameOn)
  {
    $("h1").text("Level " + level);
    isGameOn = true;
    nextSequence();
  }
});

$(".btn").click(function(){
  var userColor = $(this).attr("id");
  userPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userColor);
});

function checkAnswer(userColor)
{
  if(gamePattern[index] != userColor)
  {
    $("h1").text("Game Over!!😥💔Press any key to restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }

  else
  {
    index++;
    if(index == level)
    {
      index = 0;
      setTimeout(function(){
        nextSequence();
      },500);
    }
  }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    userPattern = [];
    isGameOn = false;
}

function nextSequence()
{
  var index = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[index];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  level++;
  $("h1").text("Level " + level);

}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
    $("#"  + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
      },100);
}

//nextSequence();
