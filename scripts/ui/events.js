// ui/events.js

import { prepareNewDeck } from "../game/deck.js";
import { dealInitialCards, hit, stand } from "../game/logic.js";
import { gameState } from "../game/state.js";
import { resetGame } from "../game/reset.js";
import { placeBet } from "../game/betting.js";
import {
  clearResult,
  showResult,
  updateBetDisplay,
  resetUI,
} from "./updateUI.js";

/**
 * Attaches click event listeners to all game buttons and links them to the appropriate game logic functions.
 * This function should be called once on page load to initialize all UI-to-logic bindings.
 */
export function setupEventListeners() {
  /**
   * Handles placing a bet when the "Place Bet" button is clicked.
   * - Validates bet amount.
   * - Updates game state and UI.
   * - Shuffles and prepares a fresh deck.
   * - Deals initial cards to player and dealer.
   */
  document.getElementById("place-bet").addEventListener("click", () => {
    let amount = parseInt(document.getElementById("bet-input").value, 10);
    const success = placeBet(amount, gameState);

    if (success) {
      clearResult();
      document.getElementById("betting-area").style.display = "none";
      document.getElementById("game-area").style.display = "block";

      updateBetDisplay(success, gameState);
      gameState.deck = prepareNewDeck();
      dealInitialCards(gameState);
    } else {
      showResult("Insufficient amount");
      resetUI();
    }
  });

  /**
   * Handles transitioning from the start screen to the betting screen when "Start Game" is clicked.
   * - Clears any old results.
   * - Displays player's current balance.
   */
  document.getElementById("start-game").addEventListener("click", () => {
    clearResult();
    document.getElementById(
      "player-balance"
    ).innerText = `Balance: $${gameState.playerBalance}`;
    document.getElementById("betting-area").style.display = "block";
    document.getElementById("start-game").style.display = "none";
  });

  /**
   * Handles when the player clicks "Hit".
   * - Requests another card for the player.
   */
  document.getElementById("hit").addEventListener("click", () => {
    hit(true, gameState);
  });

  /**
   * Handles when the player clicks "Stand".
   * - Ends player's turn and plays out dealer's turn.
   */
  document.getElementById("stand").addEventListener("click", () => {
    stand(gameState);
  });

  /**
   * Handles game reset when "Reset Game" is clicked.
   * - Resets game state and UI.
   * - Returns to the start screen.
   */
  document.getElementById("reset-game").addEventListener("click", () => {
    resetGame(gameState);
  });
}
