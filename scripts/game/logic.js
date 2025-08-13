// logic.js
import {
  updateHands,
  showResult,
  toggleButtons,
  updateBetDisplay,
  displayOutcome,
} from "../ui/updateUI.js";
import { resolveRound } from "./betting.js";
import { OUTCOME, determineOutcome } from "./compare.js";

/**
 * Calculates the total value of a Blackjack hand, treating Aces as 1 or 11
 * depending on which results in the highest score without busting.
 *
 * @param {Array<Object>} hand - Array of card objects ({ suit, value }).
 * @returns {number} The total value of the hand.
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
 * Checks if a hand is a soft 17 (Ace counted as 11 plus other cards totaling 6).
 * Used to determine if the dealer should draw another card according to common rules.
 *
 * @param {Array<Object>} hand - The dealer's current hand.
 * @returns {boolean} True if the hand is a soft 17, false otherwise.
 */
export function isSoft17(hand) {
  let aceCount = 0;
  for (let card of hand) {
    if (card.value === "Ace") aceCount++;
  }
  return hand.length === 2 && aceCount === 1 && calculateHandTotal(hand) === 17;
}

/**
 * Checks if a hand has busted (> 21). If so, resolves the round,
 * updates the UI, and disables player actions.
 *
 * @param {Array<Object>} hand - The hand to check.
 * @param {boolean} isPlayer - True if this is the player's hand, false for dealer.
 * @param {Object} gameState - The current game state object.
 * @returns {boolean} True if the hand is busted, false otherwise.
 */
export function checkBust(hand, isPlayer, gameState) {
  const total = calculateHandTotal(hand);
  if (total > 21) {
    showResult(
      isPlayer ? "You busted! Dealer wins." : "Dealer busted! You win."
    );
    resolveRound(isPlayer ? OUTCOME.LOSE : OUTCOME.WIN, gameState);
    updateBetDisplay(true, gameState);
    updateHands(false, gameState);
    toggleButtons(false);
    return true;
  }
  return false;
}

/**
 * Draws a card for either the player or dealer, updates the UI,
 * and checks for bust.
 *
 * @param {boolean} isPlayer - True for player, false for dealer.
 * @param {Object} gameState - The current game state.
 * @returns {{ hand: Array<Object>, busted: boolean }} The updated hand and bust status.
 */
export function hit(isPlayer, gameState) {
  const hand = isPlayer ? gameState.playerHand : gameState.dealerHand;
  hand.push(gameState.deck.pop());

  updateHands(isPlayer, gameState);

  const busted = checkBust(hand, isPlayer, gameState);
  return { hand, busted };
}

/**
 * Executes the dealer's turn after the player stands.
 * Dealer draws until reaching 17 or higher, following the soft 17 rule,
 * then determines the round outcome.
 *
 * @param {Object} gameState - The current game state.
 */
export function stand(gameState) {
  const { dealerHand } = gameState;
  updateHands(false, gameState);

  while (
    calculateHandTotal(dealerHand) < 17 ||
    (calculateHandTotal(dealerHand) === 17 && isSoft17(dealerHand))
  ) {
    hit(false, gameState);
    updateHands(false, gameState);
  }

  if (!checkBust(dealerHand, false, gameState)) {
    const outcome = determineOutcome(
      gameState.playerHand,
      dealerHand,
      gameState
    );
    displayOutcome(outcome, gameState);
  }
}

/**
 * Deals the initial two cards to player and dealer,
 * then checks for an immediate blackjack.
 *
 * @param {Object} gameState - The current game state.
 */
export function dealInitialCards(gameState) {
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
 * Checks for a natural blackjack (Ace + 10-value card) for either player or dealer.
 * If detected, resolves the round immediately.
 *
 * @param {Array<Object>} playerHand - The player's starting hand.
 * @param {Array<Object>} dealerHand - The dealer's starting hand.
 * @param {Object} gameState - The current game state.
 * @returns {boolean} True if the round ends due to blackjack, false otherwise.
 */
export function checkBlackjack(playerHand, dealerHand, gameState) {
  gameState.playerTotal = calculateHandTotal(playerHand);
  gameState.dealerTotal = calculateHandTotal(dealerHand);

  if (gameState.playerTotal === 21 && gameState.dealerTotal !== 21) {
    resolveRound(OUTCOME.BLACKJACK, gameState);
    updateBetDisplay(true, gameState);
    updateHands(false, gameState);
    showResult("Blackjack! You win!");
    toggleButtons(false);
    return true;
  } else if (gameState.playerTotal !== 21 && gameState.dealerTotal === 21) {
    resolveRound(OUTCOME.LOSE, gameState);
    updateBetDisplay(true, gameState);
    updateHands(false, gameState);
    showResult("Dealer Blackjack! Dealer wins!");
    toggleButtons(false);
    return true;
  } else if (gameState.playerTotal === 21 && gameState.dealerTotal === 21) {
    updateHands(false, gameState);
    updateBetDisplay(true, gameState);
    resolveRound(OUTCOME.PUSH, gameState);
    showResult("Both have Blackjack! Push.");
    toggleButtons(false);
    return true;
  }
  return false;
}
