// reset.js
import { resetUI } from "../ui/updateUI.js";
import { createDeck } from "./deck.js";

// Reset the game state to its initial values
export function resetGameState(gameState) {
  // Reset game state
  gameState.playerHand = [];
  gameState.dealerHand = [];
  gameState.deck = createDeck(); // Fresh deck created or create Shoe in the future
}

// Reset the UI to its initial state
export function resetGameUI() {
  // Reset UI
  resetUI();

  // Restore initial screen
  document.getElementById("game-area").style.display = "none";
  document.getElementById("start-game").style.display = "block";
}

// Controller function to reset the game
export function resetGame(gameState) {
  resetGameState(gameState);
  resetGameUI();
}
