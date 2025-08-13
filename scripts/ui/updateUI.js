// blackjackUI.js
import { calculateHandTotal } from "../game/logic.js";

/**
 * Display messages for each possible outcome.
 */
const OUTCOME_MESSAGES = {
  win: "You win!",
  lose: "Dealer wins!",
  push: "Push.",
};

/**
 * Updates the visual representation of player and dealer hands,
 * along with their scores. Optionally hides the dealer's first card.
 *
 * @param {boolean} [hideDealerCard=true] - Whether to hide the dealer's first card.
 * @param {Object} state - The current game state object.
 */
export function updateHands(hideDealerCard = true, state) {
  renderHand("player-hand", state.playerHand);
  renderHand("dealer-hand", state.dealerHand, hideDealerCard);

  document.getElementById(
    "player-score"
  ).innerText = `Player Score: ${calculateHandTotal(state.playerHand)}`;
  document.getElementById("dealer-score").innerText = hideDealerCard
    ? "?"
    : calculateHandTotal(state.dealerHand);
}

/**
 * Renders a given hand into the specified DOM container.
 * Optionally hides the first card (used for the dealer).
 *
 * @param {string} containerId - The DOM ID of the container.
 * @param {Array} hand - The array of card objects to render.
 * @param {boolean} [hideFirstCard=false] - Whether to hide the first card.
 */
function renderHand(containerId, hand, hideFirstCard = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = hand
    .map((card, idx) =>
      hideFirstCard && idx === 0
        ? `<img src="assets/cards/back.png" class="card-img" />`
        : `<img src="assets/cards/${getCardImageFilename(
            card
          )}" class="card-img" />`
    )
    .join("");
}

/**
 * Displays the outcome message for the round and updates the bet display.
 * Disables in-game action buttons.
 *
 * @param {"win"|"lose"|"push"} outcome - The result of the round.
 * @param {Object} state - The current game state object.
 */
export function displayOutcome(outcome, state) {
  updateBetDisplay(true, state);
  showResult(OUTCOME_MESSAGES[outcome] || "");
  toggleButtons(false);
}

/**
 * Updates the on-screen bet and player balance display.
 *
 * @param {boolean} isBetAccepted - Whether the bet was accepted.
 * @param {Object} state - The current game state object.
 */
export function updateBetDisplay(isBetAccepted, state) {
  if (!isBetAccepted) return;
  document.getElementById(
    "current-bet"
  ).innerText = `Current Bet: $${state.currentBet}`;
  document.getElementById(
    "player-balance"
  ).innerText = `Balance: $${state.playerBalance}`;
}

/**
 * Shows a result message in the UI.
 *
 * @param {string} message - The message to display.
 */
export function showResult(message) {
  document.getElementById("result").innerText = message;
}

/**
 * Clears the result message from the UI.
 */
export function clearResult() {
  document.getElementById("result").innerText = "";
}

/**
 * Enables or disables hit/stand buttons and toggles the reset button visibility.
 *
 * @param {boolean} enabled - Whether to enable action buttons.
 */
export function toggleButtons(enabled) {
  document.getElementById("hit").disabled = !enabled;
  document.getElementById("stand").disabled = !enabled;
  document.getElementById("reset-game").style.display = enabled
    ? "none"
    : "block";
}
/**
 * Resets all game-related UI elements to their default empty state.
 * Also re-enables in-game action buttons.
 */
export function resetUI() {
  [
    "player-hand",
    "dealer-hand",
    "player-score",
    "dealer-score",
    "result",
  ].forEach((id) => {
    document.getElementById(id).innerText = "";
  });
  toggleButtons(true);
  document.getElementById("reset-game").style.display = "none";
}

/**
 * Returns the correct image filename for a given card object.
 *
 * @param {Object} card - The card object with value and suit properties.
 * @returns {string} The filename for the card image.
 */
function getCardImageFilename(card) {
  return `${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;
}

/**
 * Updates the wins and losses count in the UI.
 *
 * @param {Object} state - The current game state object.
 */
export function updateStats(gameState) {
  document.getElementById("wins-count").innerText = gameState.wins;
  document.getElementById("losses-count").innerText = gameState.losses;
}
