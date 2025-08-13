// main.js
// Entry point for the Blackjack application.
// Sets up event listeners for UI interactions on page load.
import { setupEventListeners } from "../ui/events.js";

/**
 * Initializes the game by setting up UI event listeners.
 * This is called once at application startup.
 */
function initGame() {
  try {
    setupEventListeners();
  } catch (error) {
    console.error("Failed to initialize game:", error);
  }
}

// Start the game
initGame();
