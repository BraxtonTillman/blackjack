// logic.js
import {
  updateHands,
  showResult,
  toggleButtons,
  updateBetDisplay,
} from "../ui/updateUI.js";
import { resolveRound } from "./betting.js";
import { compareCards } from "./compare.js";

/**
 * Calculates the total value of a hand in Blackjack, accounting for Aces as 1 or 11.
 *
 * @param {Array<Object>} hand - Array of card objects.
 * @returns {number} The total score for the given hand.
 */
export function calculateHandTotal(hand) {
  let total = 0;
  let aceCount = 0;

  for (let card of hand) {
    if (["Jack", "Queen", "King"].includes(card.value)) {
      total += 10;
    } else if (card.value === "Ace") {
      total += 11;
      aceCount++;
    } else {
      total += Number(card.value);
    }
  }

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  return total;
}

/**
 * Determines if the dealer's hand is a "soft 17" (an Ace counted as 11 + other cards = 17).
 * Used to check whether the dealer should hit again per standard blackjack rules.
 *
 * @param {Array} hand - The dealer's current hand.
 * @returns {boolean} - True if the hand is a soft 17, false otherwise.
 */

export function isSoft17(hand) {
  let aceCount = 0;
  for (let card of hand) {
    if (card.value === "Ace") aceCount++;
  }
  return hand.length === 2 && aceCount === 1 && calculateHandTotal(hand) === 17;
}

/**
 * Checks if the given hand has busted (total > 21).
 * If a bust occurs, updates the UI with the result and disables game controls.
 *
 * @param {Array} hand - The hand to evaluate (player or dealer).
 * @param {boolean} isPlayer - True if evaluating the player's hand, false for dealer.
 * @param {Object} gameState - The current game state object.
 * @returns {boolean} - True if the hand is busted, otherwise false.
 */
export function checkBust(hand, isPlayer, gameState) {
  const total = calculateHandTotal(hand);
  if (total > 21) {
    showResult(
      isPlayer ? "You busted! Dealer wins." : "Dealer busted! You win."
    );
    resolveRound(isPlayer ? "lose" : "win", gameState);
    updateBetDisplay(true, gameState);
    updateHands(false, gameState);
    toggleButtons(false);

    return true;
  }

  return false;
}

/**
 * Draws a card for the player or dealer, updates UI, and checks for bust.
 *
 * @param {boolean} isPlayer - True if drawing for player, false for dealer.
 * @param {Object} gameState - The current state of the game.
 * @returns {Object} Updated hand and bust status.
 */
export function hit(isPlayer, gameState) {
  const hand = isPlayer ? gameState.playerHand : gameState.dealerHand;
  hand.push(gameState.deck.pop());

  updateHands(isPlayer, gameState);

  const busted = checkBust(hand, isPlayer, gameState);
  return { hand, busted };
}

/**
 * Handles dealer's turn after player stands, and determines the winner.
 *
 * @param {Object} gameState - The current state of the game.
 */
export function stand(gameState) {
  const { playerHand, dealerHand } = gameState;
  updateHands(false, gameState);

  while (
    calculateHandTotal(dealerHand) < 17 ||
    (calculateHandTotal(dealerHand) === 17 && isSoft17(dealerHand))
  ) {
    hit(false, gameState);

    updateHands(false, gameState);
  }

  if (!checkBust(dealerHand, false, gameState)) {
    compareCards(playerHand, dealerHand);
  }
}

/**
 * Deals two cards each to the player and dealer and updates the UI.
 *
 * @param {Object} gameState - The current state of the game including deck, hands, and scores.
 * @var ended - boolean variable that holds checkBlackJack's return value. If true then game is ended, else continue game
 */
export function dealInitialCards(gameState) {
  // Deal 2 cards to player and dealer
  gameState.playerHand = [gameState.deck.pop(), gameState.deck.pop()];
  gameState.dealerHand = [gameState.deck.pop(), gameState.deck.pop()];

  updateHands(true, gameState);
  const ended = checkBlackjack(
    gameState.playerHand,
    gameState.dealerHand,
    gameState
  );

  if (ended) return;
}

/**
 * Checks if the player or dealer has a natural blackjack (Ace + 10-value card).
 * Should be called immediately after the initial cards are dealt.
 *
 * @param {Array} playerHand - The player's hand.
 * @param {Array} dealerHand - The dealer's hand.
 * @param {Object} gameState - The current game state object.
 * @returns {boolean} - True if the round ends due to blackjack, otherwise false.
 */
export function checkBlackjack(playerHand, dealerHand, gameState) {
  gameState.playerTotal = calculateHandTotal(playerHand);
  gameState.dealerTotal = calculateHandTotal(dealerHand);

  if (gameState.playerTotal === 21 && gameState.dealerTotal !== 21) {
    resolveRound("blackjack", gameState);
    updateBetDisplay(true, gameState);
    updateHands(false, gameState);
    showResult("BlackJack! You Win!");
    toggleButtons(false);
  } else if (gameState.playerTotal !== 21 && gameState.dealerTotal === 21) {
    resolveRound("lose", gameState);
    updateBetDisplay(true, gameState);
    updateHands(false, gameState);
    showResult("Dealer BlackJack! Dealer Wins!");
    toggleButtons(false);
  } else if (gameState.playerTotal === 21 && gameState.dealerTotal === 21) {
    updateHands(false, gameState);
    updateBetDisplay(true, gameState);
    resolveRound("push", gameState);
    showResult("You and Dealer have BlackJack! Push.");
    toggleButtons(false);
  }
  return false;
}
