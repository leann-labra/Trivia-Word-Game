var wordBlank = document.querySelector(".word-blanks");
var letterWrong = document.querySelector("wrong-letters");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var questionsEl = document.querySelector(".question");

var shuffledQuestions
var questionIndex = 0

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

//assign array details for questions 
var arrayShuffleQuestions
var QuestionIndex = 0 

// Array of words the user will guess
var questions = [
   {
    q: "blah blah blah",
    word: "matrotrophy index"
   },
   {
    q: "blah blah",
    word: "next word"
   }
  ]

// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 90;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5);
  setQuestion()
  renderBlanks()
  startTimer()
}

var setQuestion = function() {
  displayQuestion(arrayShuffleQuestions[QuestionIndex])
};



// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

displayQuestion = function(index) {
  questionsEl.innerText = index.q
}

// Creates blanks on screen
renderBlanks = function(index) {
  // Randomly picks word from words array
  words = index.words;
  chosenWord = words;
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blanksLetters = []
  // Uses loop to push blanks to blankLetters array
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
  // Converts blankLetters array into a string and renders it on the screen
  wordBlank.textContent = blanksLetters.join(" ");
}



// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
};

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

