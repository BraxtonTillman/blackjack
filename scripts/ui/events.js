// ui/events.js

import { createDeck, shuffleDeck } from "../game/deck.js";
import { dealInitialCards, hit, stand } from "../game/logic.js";
import { gameState } from "../game/state.js";
import { resetGame } from "../game/reset.js";

/**
 * Attaches all event listeners to the game buttons (Start, Hit, Stand, Reset).
 * Connects UI interactions to game logic.
 */
export function setupEventListeners() {
  // Start game
  document.getElementById("start-game").addEventListener("click", () => {
    gameState.deck = shuffleDeck(createDeck());
    dealInitialCards(gameState);
    document.getElementById("game-area").style.display = "block";
    document.getElementById("start-game").style.display = "none";
  });

  // Player hits
  document.getElementById("hit").addEventListener("click", () => {
    hit(true, gameState);
  });

  // Player stands
  document.getElementById("stand").addEventListener("click", () => {
    stand(gameState);
  });

  // Reset game
  document.getElementById("reset-game").addEventListener("click", () => {
    resetGame(gameState); // Pass your actual game state here
  });
}
