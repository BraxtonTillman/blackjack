// ui/events.js

import { createDeck, shuffleDeck } from "../game/deck.js";
import { dealInitialCards, hit, stand } from "../game/logic.js";
import { gameState } from "../game/state.js";
import { resetGame } from "../game/reset.js";
import { placeBet } from "../game/betting.js";
import { clearResult, showResult, updateBetDisplay } from "./updateUI.js";

/**
 * Attaches all event listeners to the game buttons (Start, Hit, Stand, Reset).
 * Connects UI interactions to game logic.
 */
export function setupEventListeners() {
  // Place bet
  document.getElementById("place-bet").addEventListener("click", () => {
    let amount = parseInt(document.getElementById("bet-input").value, 10);
    const success = placeBet(amount, gameState);
    if (success) {
      clearResult();
      document.getElementById("betting-area").style.display = "none";
      document.getElementById("game-area").style.display = "block";

      updateBetDisplay(success, gameState);
      gameState.deck = shuffleDeck(createDeck());
      dealInitialCards(gameState);
    } else {
      showResult("Insufficient amount");
      resetUI();
      showResult("");
    }
  });

  // Start game
  document.getElementById("start-game").addEventListener("click", () => {
    clearResult();
    document.getElementById(
      "player-balance"
    ).innerText = `Balance: $${gameState.playerBalance}`;
    document.getElementById("betting-area").style.display = "block";
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
    resetGame(gameState);
  });
}
