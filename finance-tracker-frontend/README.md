# finance-tracker-frontend

A full stack personal finance application built with React and Vite, consuming a live Spring Boot REST API deployed on Railway. Users can manage budgets, log transactions, track spending progress, and work toward savings goals, all in a responsive, clean interface inspired by modern fintech products.

---

## Live

| Resource | URL |
|----------|-----|
| Frontend | https://finance-tracker-frontend-six-rho.vercel.app |
| Backend API | https://finance-tracker-production-1547.up.railway.app/api/budgets |
| Backend Repo | https://github.com/OlisaKenneth/finance-tracker |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool and dev server |
| React Router | Client-side routing and navigation |
| JavaScript | Core language |
| CSS | Custom styling (no UI framework) |
| Vercel | Deployment with continuous deployment via GitHub |

---

## Current Features

### Dashboard
- Summary stats, total budget, total spent, remaining balance, transaction count
- Budget overview with progress bars showing spending vs monthly limit
- Recent transactions list
- Savings goals overview with progress bars

### Budgets
- View all budgets with spending progress bars
- Create new budgets with category and monthly limit
- Update the monthly limit of any budget
- Delete budgets
- Progress bar turns red when spending approaches or exceeds the limit
- Budget spent amount updates automatically when a transaction is added

### Transactions
- View all transactions with date, category, description, and amount
- Add new transactions, the matching budget's spent amount updates immediately
- Delete transactions

### Savings Goals
- Create savings goals with a name, target amount, and number of months
- View all goals via a dropdown selector
- See saved so far, target amount, percentage complete, and monthly target
- Add money to any goal

### Navigation
- React Router with 4 pages, Home, Budgets, Transactions, Savings
- Segmented control nav with active page highlighting
- All routes work on direct URL access and mobile browsers

### Design
- Fully responsive works on mobile and desktop
- Clean system font stack matching Apple's design language
- White card-based layout on light grey background
- Smooth progress bar transitions
- Accessible color coding, red for overspending, green for savings

---

## Planned Features

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes, only logged-in users can access their data
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
- Monthly spending breakdown by category (pie chart / bar chart)
- Spending trends over time
- Savings goal timeline projections
- Annual financial summary

### UI and Experience
- Dark mode toggle
- Filter and search transactions by category or date range
- Over-budget alerts and notifications
- Settings page for user preferences

---

## Architecture

### State Management
All state lives in `App.jsx` and is distributed to pages and components via props. Logic is separated from UI using custom React hooks:

```
App.jsx
├── useBudgets()         → budget state, fetch, update, delete
├── useForm()            → budget form state and POST submission
├── useTransactions()    → transaction state, fetch, delete
├── useTransactionForm() → transaction form state and POST submission
└── useSavingsGoal()     → savings goal state, create, add money
```

Each hook owns its own state and API calls. App.jsx assembles the data and passes it down to components via props. Components contain zero business logic, they only display data and call functions passed via props.

### Data Flow

```
Railway API (Spring Boot + PostgreSQL)
         │
         │  fetch() calls
         ▼
    Custom Hooks
         │
         │  props
         ▼
      App.jsx
         │
         │  props
    ┌────┴────┐
    ▼         ▼
 Pages    Components
```

### Routing

```
/              → Dashboard (stats, budget overview, recent transactions)
/budgets       → Budget list + add budget form
/transactions  → Transaction list + add transaction form
/savings       → Savings goal display + create goal form
```

---

## Project Structure

```
finance-tracker-frontend/
├── public/
├── src/
│   ├── hooks/
│   │   ├── useBudgets.js           — budget state, fetch, update, delete
│   │   ├── useForm.js              — budget form state and submission
│   │   ├── useTransactions.js      — transaction state, fetch, delete
│   │   ├── useTransactionForm.js   — transaction form state and submission
│   │   └── useSavingsGoal.js       — savings goal state, create, add money
│   ├── App.jsx                     — root component, routing, data flow
│   ├── Dashboard.jsx               — home page overview
│   ├── DisplayBudget.jsx           — budget list with progress bars
│   ├── DisplayTransactions.jsx     — transaction list with delete
│   ├── DisplaySavingsGoal.jsx      — savings goal display with dropdown
│   ├── Form.jsx                    — add budget form
│   ├── TransactionForm.jsx         — add transaction form
│   ├── SavingsGoalForm.jsx         — create savings goal form
│   ├── index.css                   — global styles
│   └── main.jsx                    — React entry point with BrowserRouter
├── vercel.json                     — Vercel rewrite config for React Router
├── package.json
└── vite.config.js
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

```
React (Vercel)                              Spring Boot (Railway)
finance-tracker-frontend-six-rho.vercel.app  →  finance-tracker-production-1547.up.railway.app
                                                              │
                                                   ┌──────────┴──────────┐
                                                   │      PostgreSQL      │
                                                   │    (Railway DB)      │
                                                   └─────────────────────┘
```

All API calls are made using the native `fetch` API inside custom hooks. CORS is configured on the backend via `WebConfig.java` to allow requests from the Vercel frontend domain.

The `vercel.json` rewrite config ensures React Router works correctly on all direct URL access and page refreshes:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Roadmap

- [x] Display and create budgets
- [x] Update and delete budgets
- [x] Budget progress bars
- [x] Display and create transactions
- [x] Delete transactions
- [x] Transactions automatically update budget spent amount
- [x] Savings goals with progress tracking
- [x] Dashboard with summary stats
- [x] React Router multi-page navigation
- [x] Custom hooks architecture
- [x] Responsive mobile design
- [x] Deployed on Vercel
- [ ] JWT authentication and protected routes
- [ ] Bank account syncing via Flinks
- [ ] AI transaction categorization via Claude API
- [ ] Charts and analytics
- [ ] Dark mode

---

## Developer

Kenneth Olisa
GitHub: [OlisaKenneth](https://github.com/OlisaKenneth)
Portfolio: [olisakenneth.netlify.app](https://olisakenneth.netlify.app)