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
    gameBoard.appendChild(card);
    card.style.backgroundColor = [color];
    card.addEventListener("click", handleCardClick);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // if first card flipped, wait until second card flipped
  // if second card flipped, compare to first card
    // if match, keep both face up
    // if not match, flip face down
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // flip face down after 1 second if two clicked cards do not match
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  console.log("I'm clicked!");
  flipCard(evt);
  // if no cards face up, flipCard executed
  // if one card face up, flipCard executed and cards compared
  // if two cards face up and match, handleCardClick will flip next
  // if two cards face up and DO NOT match, handleCardClick will unFlipCard on both face up and restart with first-card
  // CANNOT CLICK SAME CARD TWICE
}
