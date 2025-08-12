// compare.js
import { calculateHandTotal } from "./logic.js";
import { showResult, toggleButtons, updateBetDisplay } from "../ui/updateUI.js";
import { gameState } from "./state.js";
import { resolveRound } from "./betting.js";

/**
 * Compares the final player and dealer hand totals to determine the outcome.
 * Updates the UI with the result and disables further input.
 *
 * @param {Array} playerHand - The player's final hand.
 * @param {Array} dealerHand - The dealer's final hand.
 */
export function compareCards(playerHand, dealerHand) {
  const playerTotal = calculateHandTotal(playerHand);
  const dealerTotal = calculateHandTotal(dealerHand);

  if (playerTotal > dealerTotal) {
    resolveRound("win", gameState);
    updateBetDisplay(true, gameState);
    showResult("You win!");
  } else if (dealerTotal > playerTotal) {
    resolveRound("lose", gameState);
    updateBetDisplay(true, gameState);
    showResult("Dealer wins!");
  } else {
    resolveRound("push", gameState);
    updateBetDisplay(true, gameState);
    showResult("Push.");
  }

  toggleButtons(false);
}
