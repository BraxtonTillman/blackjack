// reset.js
import { resetUI } from "../ui/updateUI.js";
import { createDeck } from "./deck.js";

/**
 * Clears the UI elements (hands, scores, result messages) to prepare for a new game.
 * Also re-enables buttons and hides the reset button.
 * @param {object} gameState - The current gameState object.
 */
export function resetGame(gameState) {
  // Reset game state
  gameState.playerHand = [];
  gameState.dealerHand = [];
  gameState.deck = createDeck();

  // Reset UI
  resetUI();

  // Restore initial screen
  document.getElementById("game-area").style.display = "none";
  document.getElementById("start-game").style.display = "block";
}
