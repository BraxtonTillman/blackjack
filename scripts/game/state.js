/**
 * Global game state object for Blackjack.
 * Tracks the deck, player/dealer hands, totals, balances, and bets.
 *
 * This object is mutable and updated throughout the game lifecycle
 * by various functions across the game logic modules.
 */
export const gameState = {
  /** @type {Array<Object>} The current deck of cards in play. */
  deck: [],

  /** @type {Array<Object>} The player's current hand. */
  playerHand: [],

  /** @type {Array<Object>} The dealer's current hand. */
  dealerHand: [],

  /** @type {number} The player's current total hand value. */
  playerTotal: 0,

  /** @type {number} The dealer's current total hand value. */
  dealerTotal: 0,

  /** @type {number} The player's available balance. */
  playerBalance: 500,

  /** @type {number} The amount currently wagered for this round. */
  currentBet: 0,

  /** @type {number} Total rounds won by the player. */
  wins: 0,

  /** @type {number} Total rounds lost by the player. */
  losses: 0,
};
