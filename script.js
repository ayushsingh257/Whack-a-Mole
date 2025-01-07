const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const startButton = document.querySelector('#start-button');
const difficultySelect = document.querySelector('#difficulty-select');
const difficultyDisplay = document.querySelector('#difficulty-display');

let result = 0;
let hitPosition;
let currentTime = 60;
let moleSpeed = 1000; // Default mole speed for Medium difficulty
let timerId = null;
let countDownTimerId = null;

// Update difficulty display
difficultySelect.addEventListener('change', () => {
  const difficulty = difficultySelect.options[difficultySelect.selectedIndex].text;
  moleSpeed = parseInt(difficultySelect.value);
  difficultyDisplay.textContent = `Difficulty: ${difficulty}`;
});

// Randomly place the mole
function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id;
}

// Add click event to each square
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      result++;
      scoreDisplay.textContent = result;
      hitPosition = null;
    } else {
      // End the game if a wrong square is clicked
      clearInterval(timerId);
      clearInterval(countDownTimerId);
      alert(`GAME OVER! You clicked the wrong box. Your final score is ${result}`);
      startButton.textContent = 'Restart Game';
      startButton.style.display = 'inline-block'; // Show the button
      difficultyDisplay.style.display = 'none'; // Hide difficulty display
    }
  });
});

// Move the mole
function moveMole() {
  timerId = setInterval(randomSquare, moleSpeed);
}

// Countdown timer
function countDown() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    clearInterval(countDownTimerId);
    alert(`GAME OVER! Your final score is ${result}`);
    startButton.textContent = 'Restart Game';
    startButton.style.display = 'inline-block'; // Show the button
    difficultyDisplay.style.display = 'none'; // Hide difficulty display
  }
}

// Start or Restart the game
function startGame() {
  result = 0;
  currentTime = 60;
  scoreDisplay.textContent = result;
  timeLeftDisplay.textContent = currentTime;

  startButton.style.display = 'none'; // Hide the start button
  difficultyDisplay.style.display = 'none'; // Hide difficulty display
  moveMole();
  countDownTimerId = setInterval(countDown, 1000);
}

// Attach event listener to the start button
startButton.addEventListener('click', startGame);
