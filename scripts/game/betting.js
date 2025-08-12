// betting.js
import { gameState } from "./state.js";

export function placeBet(amount, gameState) {
  if (amount > 0 && amount <= gameState.playerBalance) {
    gameState.playerBalance -= amount;
    gameState.currentBet += amount;
    console.log(
      "After placing bet:",
      gameState.playerBalance,
      gameState.currentBet
    );

    return true;
  } else return false;
}

export function resolveRound(outcome, gameState) {
  if (outcome === "win") {
    gameState.playerBalance += gameState.currentBet * 2;
  } else if (outcome === "blackjack") {
    gameState.playerBalance += gameState.currentBet * 2.5;
  } else if (outcome === "push") {
    gameState.playerBalance += gameState.currentBet;
  } else {
    // lose, do nothing
  }
  gameState.currentBet = 0;
}
