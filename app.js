let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;
let previousInputs = [];

const guessButton = document.querySelector(".guess-submit");
const inputElement = document.querySelector(".user-input");
const previousGuess = document.querySelector(".previous-guess");
const clue = document.querySelector(".clue");
const result = document.querySelector(".result");
const attemptCount = document.querySelector(".attempt-count");
const newGame = document.querySelector(".new-game");

inputElement.focus();

guessButton.addEventListener("click", () => {
  const userInput = Number(inputElement.value);

  if (attemptsLeft < 1) return handleGameOver();

  if (userInput < 1 || userInput > 100) {
    alert("Number should be between 1 and 100");
    clearAndFocusInput();
    return;
  }

  if (previousInputs.includes(userInput)) {
    alert("Come on. You have already tried this number");
    clearAndFocusInput();
    return;
  }

  previousInputs.push(userInput);
  checkGuess(userInput);
});

function checkGuess(userInput) {
  if (userInput === randomNumber) {
    result.textContent = "Congratulations! You have won";
    result.style.color = "green";
    endGame();
    return;
  }

  clue.textContent =
    userInput < randomNumber
      ? "Guessed number is SMALL!"
      : "Guessed number is BIG!";
  result.textContent = "Wrong!!!";
  result.style.color = "red";

  updateAfterGuess();
}

function updateAfterGuess() {
  attemptsLeft--;
  attemptCount.textContent = attemptsLeft;
  previousGuess.textContent = `Previous Guesses: ${previousInputs.join(" ")}`;
  clearAndFocusInput();

  if (attemptsLeft < 1) handleGameOver();
}

function handleGameOver() {
  result.textContent = "GAME OVER";
  result.style.color = "black";
  endGame();
}

function endGame() {
  guessButton.disabled = true;
  newGame.style.display = "block";
}

function clearAndFocusInput() {
  inputElement.value = "";
  inputElement.focus();
}

newGame.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  previousInputs = [];

  attemptCount.textContent = attemptsLeft;
  previousGuess.textContent = "";
  result.textContent = "";
  clue.textContent = "";
  inputElement.value = "";
  guessButton.disabled = false;
  newGame.style.display = "none";
  inputElement.focus();
});
