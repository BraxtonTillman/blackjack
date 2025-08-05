// compare.js
import { calculateHandTotal } from "./logic.js";
import { showResult, toggleButtons } from "../ui/updateUI.js";

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
    showResult("You win!");
  } else if (dealerTotal > playerTotal) {
    showResult("Dealer wins!");
  } else {
    showResult("Push.");
  }

  toggleButtons(false);
}
