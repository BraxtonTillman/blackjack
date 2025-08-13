// compare.js
import { calculateHandTotal } from "./logic.js";
import { resolveRound } from "./betting.js";

/**
 * Constants for valid round outcomes.
 */
export const OUTCOME = {
  WIN: "win",
  LOSE: "lose",
  PUSH: "push",
  BLACKJACK: "blackjack",
};

/**
 * Determines the round outcome by comparing the player and dealer totals.
 * Updates the game state accordingly by resolving the round.
 *
 * @param {Array} playerHand - The player's hand (array of card objects).
 * @param {Array} dealerHand - The dealer's hand (array of card objects).
 * @param {Object} state - The current game state object.
 * @returns {"win"|"lose"|"push"} The result of the comparison.
 */
export function determineOutcome(playerHand, dealerHand, state) {
  const playerTotal = calculateHandTotal(playerHand);
  const dealerTotal = calculateHandTotal(dealerHand);

  let outcome;
  if (playerTotal > dealerTotal) {
    outcome = "win";
  } else if (dealerTotal > playerTotal) {
    outcome = "lose";
  } else {
    outcome = "push";
  }

  resolveRound(outcome, state);
  return outcome; // "win", "lose", or "push"
}
