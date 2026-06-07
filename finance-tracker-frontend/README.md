# finance-tracker-frontend

React frontend for the Finance Tracker API — a full stack Canadian personal finance application connected to a live Spring Boot REST API deployed on Railway.

---

## Live Demo

Frontend: (coming soon — Vercel deployment)  
Backend API: https://finance-tracker-production-1547.up.railway.app  
Backend Repo: https://github.com/OlisaKenneth/finance-tracker

---

## Tech Stack

- React (Vite)
- JavaScript
- HTML / CSS
- Spring Boot REST API (backend)
- PostgreSQL via Railway (database)

---

## Current Features

- View all budgets fetched live from the Railway API
- Create new budgets via form (POST request)
- Budget list refreshes automatically after submission — no page reload needed
- State managed in App.jsx and passed down to child components via props
- Global CORS configuration on backend to allow React frontend access

---

## Planned Features

### Budget Management
- Edit existing budgets
- Delete budgets
- View spending progress per budget (amount spent vs monthly limit)
- Visual budget progress bars
- Over-budget alerts displayed in the UI

### Transaction Management
- View all transactions linked to a budget category
- Add new transactions with description, amount, category, and date
- Delete transactions
- Filter transactions by category or date range

### Savings Goals
- View savings goal progress (saved so far vs target amount)
- Add money toward a savings goal
- Visual progress indicator (percentage complete)
- Monthly savings target calculator

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes — only logged-in users can access their data
- Each user sees only their own budgets, transactions, and savings goals

### Bank Account Syncing (Flinks / Plaid)
- Connect real Canadian bank accounts via Flinks
- Automatically import real transactions from connected accounts
- Map imported transactions to budget categories

### AI-Powered Transaction Categorization (Claude API)
- Automatically categorize imported bank transactions using the Anthropic Claude API
- Suggest the correct budget category based on transaction description
- Learn from user corrections over time

### Analytics and Reporting
- Monthly spending breakdown by category
- Annual spending intelligence report
- Spending trends over time (charts and graphs)
- Savings goal timeline projections

### UI and Experience
- Fully responsive design — works on mobile and desktop
- Dark mode support
- Dashboard view showing all key metrics at a glance
- React Router for multi-page navigation (Dashboard, Budgets, Transactions, Savings, Settings)

---

## Project Structure

```
src/
├── App.jsx              — root component, owns all state and fetch logic
├── DisplayBudget.jsx    — displays list of budgets via props
├── Form.jsx             — handles user input and budget creation
├── index.css            — global styles
└── main.jsx             — React entry point
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/OlisaKenneth/finance-tracker-frontend.git

# 2. Navigate into the project
cd finance-tracker-frontend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open your browser
http://localhost:5173
```

---

## How It Connects to the Backend

The React app talks to the Finance Tracker Spring Boot API:

```
React (Vercel)                  Spring Boot (Railway)
localhost:5173         →        https://finance-tracker-production-1547.up.railway.app
                                        │
                               ┌────────┴────────┐
                               │    PostgreSQL    │
                               │   (Railway DB)   │
                               └─────────────────┘
```

CORS is configured on the backend via `WebConfig.java` to allow requests from the frontend.

---

## Developer

Kenneth Olisa  
GitHub: [OlisaKenneth](https://github.com/OlisaKenneth)  
Portfolio: [olisakenneth.netlify.app](https://olisakenneth.netlify.app)
