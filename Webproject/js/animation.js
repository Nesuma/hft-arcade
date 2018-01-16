
var xTemp;
var yTemp;
var movementX;
var movementY;
var racketLeftY;
var racketRightY;
var posX;
var posY;
var id;
var classGame = document.getElementsByClassName("game");

$(document).ready(function(){
    $("#endButton").click(function(){
        $("#startButton").text("start");
        $("#startButton").prop('disabled',false);
        $("#endButton").prop('disabled',true);
        endGame();
    });
    $("#startButton").click(function(){
      startGame();
    });
});

// document.getElementById("startButton").onclick = function() {startGame()};

// function toggleDisplay() {
//   if (classGame[0].style.display == 'none') {
//     for (var i = 0; i < classGame.length; i++) {
//       classGame[i].style.display = "block";
//     }
//   } else {
//     for (var i = 0; i < classGame.length; i++) {
//       classGame[i].style.display = "none";
//     }
//   }
// }
var racketLeft = $("#racketLeft");
var racketRight = $("#racketRight");
var ball = $("#ball");
function step(){
  posX += movementX;
  posY += movementY;
  ball.css("top",posY + "px");
  ball.css("left",posX + "px");

  var key;
  for (key in keysPressed){
    switch (Number(key)) {
      case 38: { //up
        if(racketRightY > 4){
          racketRightY -= 5;
        }
        break;
      }
      case 40: { //down
        if (racketRightY < 296) {
          racketRightY += 5;
        }
        break;
      }
      case 87: { //w
        if (racketLeftY > 4) {
          racketLeftY -= 5;
        }
        break;
      }
      case 83: { //s
        if (racketLeftY < 296) {
          racketLeftY += 5;
        }
        break;
      }
    }
  }
  racketLeft.css("top", racketLeftY + "px");
  racketRight.css("top", racketRightY + "px");

  if(posY > 389 || posY < 0){
    movementY *= -1;
  }
  if(posX < 51 && posX > 39 && posY > racketLeftY && posY < racketLeftY+100){
    movementX *= -1;
  }
  if(posX < 761 && posX > 749 && posY > racketRightY && posY < racketRightY+100){
    movementX *= -1;
  }
  if(posX > 789){
    console.log("Punkt für links");
    clearInterval(id);
  }
  if(posX < 1){
    console.log("Punkt für rechts");
    clearInterval(id);
  }
}

function startGame() {
  posX = 375;
  posY = 175;

  racketLeftY = 150;
  racketRightY = 150;

  xTemp = (Math.random() * 5) * ((Math.random() > 0.49) ? 1 : -1);
  yTemp = (Math.random() * 5) * ((Math.random() > 0.49) ? 1 : -1);
  movementX = (xTemp / Math.sqrt((xTemp * xTemp) + (yTemp * yTemp))) * 5;
  movementY = (yTemp / Math.sqrt((xTemp * xTemp) + (yTemp * yTemp))) * 3;

  $("#startButton").text("running");
  $("#startButton").prop('disabled',true);
  $("#endButton").prop('disabled',false);
  $("#ball").css("top",posY + "px");
  $("#ball").css("left",posX + "px");
  id = setInterval(step, 30);


  // element.style.top = ;
  // element.style.left = posX + "px";
  // toggleDisplay();
  // clearInterval(id); // nur für SnakeOption
}
function endGame() {
  clearInterval(id);
}
var keysPressed = {};

$(document).keydown(function (e) {
    keysPressed[e.which] = true;
});

$(document).keyup(function (e) {
    delete keysPressed[e.which];
})

// window.onkeydown = function(e) {
//   var key = e.keyCode ? e.keyCode : e.which;
//   switch (key) {
//     case 38: { //up
//       racketRightY -= 5;
//       console.log("up");
//       break;
//     }
//     case 40: { //down
//       racketRightY += 5;
//       console.log("down");
//       break;
//     }
//     case 87: { //w
//       racketLeftY -= 5;
//       console.log("w");
//       break;
//     }
//     case 83: { //s
//       racketLeftY += 5;
//       console.log("s");
//       break;
//     }
//   }
// }

//Geradeaus bis Änderung

// window.onkeyup = function(e){
//   clearInterval(id);
//   var stepX;
//   var stepY;
//   var key = e.keyCode ? e.keyCode : e.which;
//   switch (key) {
//     case 65: { //a
//       stepX = -5;
//       break;
//     }
//     case 68: { //d
//       stepX = 5;
//       break;
//     }
//     case 83: { //s
//       stepY = 5;
//       break;
//     }
//     case 87: { //w
//       stepY = -5;
//       break;
//     }
//   }
//   id = setInterval(step, 50);
//   function step() {
//     if (posX < 400 && posX > 0 && posY > 0 && posY < 400) {
//       posX += stepX;
//       posY += stepY;
//       element.style.top = posY + "px";
//       element.style.left = posX + "px";
//     } else {
//       // endGame();
//       // startGame();
//     }
//   }
// }
//Einzelne Schritte