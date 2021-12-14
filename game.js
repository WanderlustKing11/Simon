// 3. buttonColors is set to hold the sequence "red", "blue", "green", "yellow"
var buttonColors = ["red", "blue", "green", "yellow"];
// 5. Created a new empty array called gamePattern.
var gamePattern = [];
// 11. Created a new empty array with the name userClickedPattern.
var userClickedPattern = [];
// 22. Need a way to keep track of if the game has started or not, so it only calls nextSequence() on the first keydown.
var started = false;
// 21. Created a new variable called level and start at level 0.
var level = 0;

// 20. Used jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function () {
  if (!started) {
    // 23. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// 9. Using jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  // 10. Created a new variable inside the handler called userChosenColor to store the id of the button that gets clicked.
  var userChosenColor = $(this).attr("id");
  // 12. Add the contents of the variable userChosenColor created in step 10 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColor);
  // 13. When a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColor);
  animatePress(userChosenColor);
  // 27. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

// 26. Created a new function called checkAnswer(), takes one input with the name currentLevel.
function checkAnswer(currentLevel) {
  // 28. check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // 29. If the user got the most recent answer right in step 28, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){
      // 30. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    // 32. In the sounds folder there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");
    // 33. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // 34. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // 36. Calling startOver() if the user gets the sequence wrong.
    startOver();
  }
}

// 1. Created the nextSquence function
function nextSequence() {
  // 31. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // 24. Increase the level by 1 every time nextSequence() is called.
  level++;
  // 25. Update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  // 2. Generated a new random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // 4. Create a new variable called randomChosenColor and use the randomNumber from step 2 to select a random color from the buttonColors array.
  var randomChosenColor = buttonColors[randomNumber];
  // 6. Add the enw randomChosenColor generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColor);
  // 7. Using jQuery, select the button with the same id as the randomChosenColor
  // and animate a flash to the selected button
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // 16. Refactored the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColor);
}

// 14. Created this function playSound() that takes a single parameter called name
//     which now contains our code to play sound, and made sure to use the same parameter in that code
function playSound(name) {
  // 8. Use Javascript to play the sound for the button color selected
  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();
}

// 17. Created a new function called animatePress(), it should take a single input parameter called currentColor.
function animatePress(currentColor) {
  // 18. Used jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");
  // 19.  Created a function to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// 35. Created a new function called startOver().
function startOver() {
  // 37. Reseting the values of level, gamePattern and started variables.
  //     Now, when game is over, pushing keydown restarts to Level 1 with a brand new gamePattern sequence.
  level = 0;
  gamePattern = [];
  started = false;
}
