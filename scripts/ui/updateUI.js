// updateUI.js
import { calculateHandTotal } from "../game/logic.js";

/**
 * Updates the UI to show player and dealer hands and their scores.
 *
 * @param {boolean} hideDealerCard - If true, hides the dealer's first card.
 * @param {Object} gameState - The current state of the game.
 */
export function updateHands(hideDealerCard = true, gameState) {
  const { playerHand, dealerHand } = gameState;
  const playerScore = calculateHandTotal(playerHand);
  const dealerScore = hideDealerCard ? "?" : calculateHandTotal(dealerHand);
  const playerHandDiv = document.getElementById("player-hand");
  const dealerHandDiv = document.getElementById("dealer-hand");

  // Player hand
  playerHandDiv.innerHTML = playerHand
    .map(
      (card) =>
        `<img src="assets/cards/${getCardImageFilename(
          card
        )}" class="card-img" />`
    )
    .join("");

  // Dealer hand
  if (hideDealerCard) {
    dealerHandDiv.innerHTML = `
    <img src="assets/cards/back.png" class="card-img" />
    <img src="assets/cards/${getCardImageFilename(
      dealerHand[1]
    )}" class="card-img" />
  `;
  } else {
    dealerHandDiv.innerHTML = dealerHand
      .map(
        (card) =>
          `<img src="assets/cards/${getCardImageFilename(
            card
          )}" class="card-img" />`
      )
      .join("");
  }

  document.getElementById("player-score").innerText = `Score: ${playerScore}`;
  document.getElementById("dealer-score").innerText = `Score: ${dealerScore}`;
}

/**
 * Displays a result message (e.g., "You win", "Dealer busted") in the UI.
 *
 * @param {string} message - The result text to show to the player.
 */
export function showResult(message) {
  document.getElementById("result").innerText = message;
}

/**
 * Enables or disables in-game buttons and toggles visibility of the reset button.
 *
 * @param {boolean} enabled - If true, enables "Hit" and "Stand" buttons; hides "Reset".
 *                            If false, disables "Hit"/"Stand" and shows "Reset".
 */
export function toggleButtons(enabled) {
  document.getElementById("hit").disabled = !enabled;
  document.getElementById("stand").disabled = !enabled;
  document.getElementById("reset-game").style.display = enabled
    ? "none"
    : "block";
}

/**
 * Clears the UI elements (hands, scores, result messages) to prepare for a new game.
 * Also re-enables buttons and hides the reset button.
 */
export function resetUI() {
  document.getElementById("player-hand").innerText = "";
  document.getElementById("dealer-hand").innerText = "";
  document.getElementById("player-score").innerText = "";
  document.getElementById("dealer-score").innerText = "";
  document.getElementById("result").innerText = "";

  toggleButtons(true); // Enable buttons again
  document.getElementById("reset-game").style.display = "none";
}

export function getCardImageFilename(card) {
  const value = card.value.toLowerCase();
  const suit = card.suit.toLowerCase();
  return `${value}_of_${suit}.png`;
}
