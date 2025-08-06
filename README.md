# 🃏 Blackjack

A professional-grade Blackjack game built with modular JavaScript. This project is structured like a production-ready web application and is the foundation for a future legal online betting platform.

## 🎯 Purpose

This project simulates a full game of Blackjack with clean code architecture, modular design, and scalable structure. It is currently in MVP stage with plans to evolve into a secure, legal, and user-friendly online betting platform.

## 💻 Features

- Full Blackjack gameplay (hit, stand, bust, dealer logic)
- Ace handling and soft 17 rules
- Blackjack detection
- Modular file structure (Game logic, UI, State management, Event handling)
- Clean, commented, and scalable code
- Responsive UI-ready

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/braxtontillman/blackjack.git
cd blackjack
```

### 2. Open `index.html`

Open the file in a browser with a live server or via a local server (recommended).

> 💡 Note: Opening directly via `file://` may result in CORS issues. Use something like VSCode’s Live Server extension or a local development server:
>
> ```bash
> npx http-server
> ```

## 📁 Project Structure

```
blackjack/
├── index.html
├── style/
│   └── main.css
├── scripts/
│   ├── game/
│   │   ├── deck.js         ← Deck creation + shuffle
│   │   ├── logic.js        ← Game rules: hit, stand, bust, blackjack, etc.
│   │   ├── compare.js      ← Compare hands for result
│   │   ├── betting.js      ← [Coming soon] Handle balance, bets, payouts
│   │   └── reset.js        ← Game reset logic
│   ├── ui/
│   │   ├── updateUI.js     ← Handles all DOM updates
│   │   └── events.js       ← Sets up button event listeners
│   └── main.js             ← Entry point: initializes and wires modules
├── assets/
│   ├── cards/              ← [Optional] Card images
│   └── sounds/             ← [Optional] Sound effects
├── README.md
└── LICENSE
```

## ✅ MVP Goals

- [x] Core Blackjack logic
- [x] UI interaction (buttons, results, display)
- [x] Blackjack & bust detection
- [ ] Betting system
- [ ] Player balance
- [ ] Backend integration
- [ ] Authentication

## 🛡️ Legal Disclaimer

This is a personal educational project. Deployment of any online betting or gambling game must comply with the legal regulations in your jurisdiction. Ensure all necessary licenses and compliance measures are taken before launching such a platform.

## 📌 Future Plans

- Add user authentication and session management
- Integrate a betting system with real or virtual currency
- Persist player balance and win history in a backend (Node + DB)
- Add visual card rendering with animations
- Prepare for legal audit and compliance review

## 🧠 Built With

- JavaScript (ES Modules)
- HTML5
- CSS3

## 📎 Related Links

- [Blackjack Rules – Wikipedia](https://en.wikipedia.org/wiki/Blackjack)
- [Gambling Compliance – Legal News & Resources](https://www.gamblingcompliance.com/)

---

**Made with ♥ by Braxton Tillman**
