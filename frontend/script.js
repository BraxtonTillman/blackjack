const deck = [
  { suit: "Hearts", value: "Ace" },
  { suit: "Hearts", value: "2" },
  { suit: "Hearts", value: "3" },
  { suit: "Hearts", value: "4" },
  { suit: "Hearts", value: "5" },
  { suit: "Hearts", value: "6" },
  { suit: "Hearts", value: "7" },
  { suit: "Hearts", value: "8" },
  { suit: "Hearts", value: "9" },
  { suit: "Hearts", value: "10" },
  { suit: "Hearts", value: "Jack" },
  { suit: "Hearts", value: "Queen" },
  { suit: "Hearts", value: "King" },
  { suit: "Spades", value: "Ace" },
  { suit: "Spades", value: "2" },
  { suit: "Spades", value: "3" },
  { suit: "Spades", value: "4" },
  { suit: "Spades", value: "5" },
  { suit: "Spades", value: "6" },
  { suit: "Spades", value: "7" },
  { suit: "Spades", value: "8" },
  { suit: "Spades", value: "9" },
  { suit: "Spades", value: "10" },
  { suit: "Spades", value: "Jack" },
  { suit: "Spades", value: "Queen" },
  { suit: "Spades", value: "King" },
  { suit: "Clubs", value: "Ace" },
  { suit: "Clubs", value: "2" },
  { suit: "Clubs", value: "3" },
  { suit: "Clubs", value: "4" },
  { suit: "Clubs", value: "5" },
  { suit: "Clubs", value: "6" },
  { suit: "Clubs", value: "7" },
  { suit: "Clubs", value: "8" },
  { suit: "Clubs", value: "9" },
  { suit: "Clubs", value: "10" },
  { suit: "Clubs", value: "Jack" },
  { suit: "Clubs", value: "Queen" },
  { suit: "Clubs", value: "King" },
  { suit: "Diamonds", value: "Ace" },
  { suit: "Diamonds", value: "2" },
  { suit: "Diamonds", value: "3" },
  { suit: "Diamonds", value: "4" },
  { suit: "Diamonds", value: "5" },
  { suit: "Diamonds", value: "6" },
  { suit: "Diamonds", value: "7" },
  { suit: "Diamonds", value: "8" },
  { suit: "Diamonds", value: "9" },
  { suit: "Diamonds", value: "10" },
  { suit: "Diamonds", value: "Jack" },
  { suit: "Diamonds", value: "Queen" },
  { suit: "Diamonds", value: "King" },
];

let playerHand = [];
let dealerHand = [];
let playerTotal = 0;
let dealerTotal = 0;

// Shuffle deck
function shuffleDeck(deck) {
  let currentIndex = deck.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex],
      deck[currentIndex],
    ];
  }
  return deck;
}

// Wire start button
document.getElementById("start-game").addEventListener("click", () => {
  document.getElementById("game-area").style.display = "block";

  shuffleDeck(deck);
  dealInitialCards();
  document.getElementById("start-game").style.display = "none";
});

// Update hands
function updateHands(hideDealerCard = true) {
  const playerHandDiv = document.getElementById("player-hand");
  const dealerHandDiv = document.getElementById("dealer-hand");
  const playerScore = calculateHandTotal(playerHand);
  const dealerScore = hideDealerCard ? null : calculateHandTotal(dealerHand); // If hiding dealer's card, don't calculate score

  // Show scores
  document.getElementById("player-score").innerText = `Score: ${playerScore}`;
  document.getElementById("dealer-score").innerText = hideDealerCard
    ? "Score: ?"
    : `Score: ${dealerScore}`;

  // Show hands (hide dealer's first card)
  playerHandDiv.innerText = playerHand
    .map((card) => `${card.value} of ${card.suit}`)
    .join(", ");

  if (hideDealerCard) {
    dealerHandDiv.innerText = `[Hidden], ${dealerHand[1].value} of ${dealerHand[1].suit}`;
  } else {
    dealerHandDiv.innerText = dealerHand
      .map((card) => `${card.value} of ${card.suit}`)
      .join(", ");
  }
}

// Deal initial hands
function dealInitialCards() {
  // Deal 2 cards to player and dealer
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];

  updateHands();
}

// Wire hit button
document.getElementById("hit").addEventListener("click", () => {
  hit(playerHand);
});

// Wire stand button
document.getElementById("stand").addEventListener("click", () => {
  stand();
});

// Hit function
function hit(hand, isPlayer = true) {
  // Add a card
  hand.push(deck.pop());

  // Update hands and calculate total
  updateHands();
  if (isPlayer) {
    playerTotal = calculateHandTotal(hand);
    checkBust(playerTotal, true);
  } else {
    dealerTotal = calculateHandTotal(hand);
    checkBust(dealerTotal, false);
  }
}

// Stand function
function stand() {
  // Stop and reveal dealer's card
  updateHands(false);
  dealerTotal = calculateHandTotal(dealerHand);
  playerTotal = calculateHandTotal(playerHand);

  while (dealerTotal < 17 || (dealerTotal === 17 && isSoft17(dealerHand))) {
    hit(dealerHand, false);
    updateHands(false);
  }

  if (!checkBust(dealerTotal, false)) {
    compareCards(); // Only if no bust happens
  }
}

// Bust Check (Check after every hit if busted) function
function checkBust(total, isPlayer = true) {
  if (total > 21) {
    if (isPlayer) {
      // Player busts
      document.getElementById("result").innerText = "You busted! Dealer wins.";
      updateHands(false); // Show dealer's hand
    } else {
      // Dealer busts
      document.getElementById("result").innerText = "Dealer busted! You win.";
    }
    // Disable buttons
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;

    const resetBtn = document.getElementById("reset-game");
    resetBtn.style.display = "block";
    resetBtn.addEventListener("click", reset);

    return true;
  }
  return false;
}

// Compare function (Compare player and dealer)
function compareCards() {
  console.log("Player Total:", playerTotal);
  console.log("Dealer Total:", dealerTotal);

  if (playerTotal > dealerTotal) {
    // Player Wins
    document.getElementById("result").innerText = "You win!";
  } else if (dealerTotal > playerTotal) {
    // Dealer Wins
    document.getElementById("result").innerText = "Dealer wins!";
  } else {
    // Tie
    document.getElementById("result").innerText = "Push.";
  }
  // Disable buttons
  document.getElementById("hit").disabled = true;
  document.getElementById("stand").disabled = true;
  // Wires and shows reset button
  const resetBtn = document.getElementById("reset-game");
  resetBtn.style.display = "block";
  resetBtn.addEventListener("click", reset);
}

// Reset function
function reset() {
  playerHand = [];
  dealerHand = [];
  playerTotal = 0;
  dealerTotal = 0;

  deck.splice(0, deck.length, ...createDeck()); // replaces old deck with a fresh one
  document.getElementById("player-hand").innerText = "";
  document.getElementById("dealer-hand").innerText = "";
  document.getElementById("player-score").innerText = "";
  document.getElementById("dealer-score").innerText = "";
  document.getElementById("result").innerText = "";

  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("reset-game").style.display = "none";
  document.getElementById("game-area").style.display = "none";
  document.getElementById("start-game").style.display = "block";
}

// Calculate Hands
function calculateHandTotal(hand) {
  let total = 0;
  let aceCount = 0;

  // Calculate total value of the hand
  for (let card of hand) {
    if (
      card.value === "Jack" ||
      card.value === "Queen" ||
      card.value === "King"
    ) {
      total += 10;
    } else if (card.value === "Ace") {
      total += 11;
      aceCount += 1;
    } else {
      total += Number(card.value);
    }
  }

  // Adjust for Aces
  while (total > 21 && aceCount > 0) {
    total -= 10; // Count Ace as 1 instead of 11
    aceCount -= 1;
  }

  return total;
}

// This function will check if dealer's starting hand is soft 17
function isSoft17(hand) {
  // Count for aces
  aceCount = 0;
  for (let card of hand) {
    if (card.value === "Ace") {
      aceCount += 1;
    }
    if (
      hand.length === 2 &&
      aceCount === 1 &&
      calculateHandTotal(hand) === 17
    ) {
      return true; // Soft 17
    }
  }
  return false;
}

function createDeck() {
  const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  const values = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

// Need to check for blackjack
