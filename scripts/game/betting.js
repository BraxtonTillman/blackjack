// betting.js

import { updateStats } from "../ui/updateUI.js";

/**
 * Payout multipliers for each round outcome.
 */
const PAYOUTS = {
  win: 2,
  blackjack: 2.5,
  push: 1,
};

/**
 * Attempts to place a bet for the given amount.
 *
 * @param {number} amount - The amount to bet.
 * @param {Object} gameState - The current game state object.
 * @param {number} gameState.playerBalance - The player's available balance.
 * @param {number} gameState.currentBet - The player's current bet in this round.
 * @returns {boolean} True if the bet is valid and placed; false otherwise.
 */
export function placeBet(amount, gameState) {
  if (amount > 0 && amount <= gameState.playerBalance) {
    gameState.playerBalance -= amount;
    gameState.currentBet += amount;
    return true;
  } else return false;
}

/**
 * Resolves the round outcome by updating the player's balance
 * and resetting the current bet.
 *
 * @param {"win"|"blackjack"|"push"|"lose"} outcome - The outcome of the round.
 * @param {Object} gameState - The current game state object.
 * @param {number} gameState.playerBalance - The player's available balance.
 * @param {number} gameState.currentBet - The player's current bet in this round.
 */
export function resolveRound(outcome, gameState) {
  if (outcome === "win") {
    gameState.playerBalance += gameState.currentBet * PAYOUTS[outcome];
    gameState.wins++;
  } else if (outcome === "blackjack") {
    gameState.playerBalance += gameState.currentBet * PAYOUTS[outcome];
    gameState.wins++;
  } else if (outcome === "push") {
    gameState.playerBalance += gameState.currentBet * PAYOUTS[outcome];
  } else if (outcome !== "lose") {
    console.warn(`Unknown outcome: ${outcome}`);
  } else {
    gameState.losses++;
  }
  updateStats(gameState);
  gameState.currentBet = 0;
}
