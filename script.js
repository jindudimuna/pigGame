'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnroll = document.querySelector('.btn--roll');
const newbtn = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const player1 = document.getElementById('current--0');
const player2 = document.getElementById('current--1');
const player1EL = document.querySelector('.player--0');
const player2EL = document.querySelector('.player--1');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1EL.classList.toggle('player--active');
  player2EL.classList.toggle('player--active');
};

//starting conditions
score0.textContent = 0;
score1.textContent = 0;
diceEL.classList.add('hidden');

//rolling dice

btnroll.addEventListener('click', function () {
  //generate random number
  const die = Math.trunc(Math.random() * 6) + 1;
  //add the dice image and load it
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${die}.png`;
  //check if score = 1;
  if (die !== 1) {
    currentScore = currentScore + die;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    // player1.textContent = currentScore;
  } else {
    switchPlayer();
  }
});

hold.addEventListener('click', function () {
  //add current score to active player score
  scores[activePlayer] = currentScore + scores[activePlayer];
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  diceEL.src = `dice-1.png`;

  //check if score is at least 100
  //finish the game or switch to next player
  if (scores[activePlayer] >= 30) {
    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
      activePlayer === 0 ? 1 : 2
    } wins🎉`;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    btnroll.disabled = true;
    hold.disabled = true;
  } else {
    switchPlayer();
  }
});
