// ui/events.js

import { prepareNewDeck } from "../game/deck.js";
import { dealInitialCards, hit, stand } from "../game/logic.js";
import { gameState } from "../game/state.js";
import { clearResult, resetUI, updateBetDisplay } from "./updateUI.js";
import { placeBet } from "../game/betting.js";

const FIXED_BET = 100; // Auto-bet amount each round

export function setupEventListeners() {
  // --- Player actions ---
  document.getElementById("hit").addEventListener("click", () => {
    hit(true, gameState);
  });

  document.getElementById("stand").addEventListener("click", () => {
    stand(gameState);
  });

  // --- Play Again button ---
  document.getElementById("play-again").addEventListener("click", () => {
    startNewRound();
  });

  // --- Auto-start first round ---
  startNewRound();
}

/**
 * Starts a new round:
 * - Clears UI
 * - Deducts bet from bankroll
 * - Shuffles deck if needed
 * - Deals initial hands
 */
function startNewRound() {
  resetUI();
  clearResult();

  // Try to place fixed bet
  const success = placeBet(FIXED_BET, gameState);
  if (!success) {
    document.querySelector(".outcome-banner").innerText =
      "Game over: Not enough balance!";
    return;
  }

  updateBetDisplay(true, gameState);

  // Shuffle deck if running low
  if (gameState.deck.length < 15) {
    gameState.deck = prepareNewDeck();
  }

  gameState.playerHand = [];
  gameState.dealerHand = [];

  dealInitialCards(gameState);
}
