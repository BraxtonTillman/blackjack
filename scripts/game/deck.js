// deck.js

/**
 * Creates a new standard 52-card deck.
 *
 * Each card is represented as an object with:
 * - `suit` (string): "Spades", "Hearts", "Diamonds", or "Clubs"
 * - `value` (string): "Ace", "2"..."10", "Jack", "Queen", "King"
 *
 * @returns {Array<Object>} A fresh array of 52 card objects.
 */
export function createDeck() {
  const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  const values = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

/**
 * Shuffles a deck of cards in place using the Fisher-Yates algorithm.
 *
 * @param {Array<Object>} deck - The deck of cards to shuffle.
 * @returns {Array<Object>} The same deck array, shuffled randomly.
 */
export function shuffleDeck(deck) {
  let currentIndex = deck.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex],
      deck[currentIndex],
    ];
  }
  return deck;
}

export function prepareNewDeck() {
  return shuffleDeck(createDeck());
}
