"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // create div DOM element and append to DOM
      // div has value of color
      // div has listener to handle click event
    let card = document.createElement("div");
    card.classList.add("main-card");
    card.setAttribute("data-color", [color]);
    
    let front = document.createElement("div")
    front.classList.add("front-card");
    front.style.backgroundColor = [color];
    
    let back = document.createElement("div");
    back.classList.add("back-card");
    back.style.backgroundColor = "white";
    
    gameBoard.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", flipCard);
  }
}


/** Flip a card face-up. */

let flipped = false;
let gameLocked = false;
let first, second;
let cards = [];

function flipCard() {
  // if first card flipped, wait until second card flipped
  // if second card flipped, compare to first card
    // if match, keep both face up
    // if not match, flip face down
  if (gameLocked) {
    return; 
  }
  if (this === first) {
    return;
  }
  this.classList.add("flip");

  if (!flipped) {
    flipped = true;
    first = this;
    return;
  }
  second = this;

  checkMatched();
}

function checkMatched() {
  if (first.dataset.color === second.dataset.color) {
    handleCardClick();
    return;
  }
  unFlipCard();
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // flip face down after 1 second if two clicked cards do not match
  gameLocked = true;
  setTimeout(() => {
    first.classList.remove("flip");
    second.classList.remove("flip");
    resetCards();
  }, 1000);
}

/** Handle clicking on a card: this could be first-card or second-card. */

let completeMatches = 0;

function handleCardClick() {
  cards.push(first);
  cards.push(second);
  first.removeEventListener("click", flipCard);
  second.removeEventListener("click", flipCard);
  completeMatches += 2;
  if (completeMatches === 10) {
    setTimeout(() => {
      gameOver();
    }, 500);
  }
  resetCards();
}

function resetCards() {
  flipped = false;
  gameLocked = false;
  first = null;
  second = null;
}

function gameOver() {
  alert("You win!");
  location.reload();
}
