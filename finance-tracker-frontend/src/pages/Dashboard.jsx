import { NavLink } from "react-router-dom"
import ConnectBank from "../components/ConnectBank"

// onSyncComplete — passed in from App.jsx
// it's the fetchTransactions function that refetches
// all transactions from the backend after bank sync
function Dashboard({ budget, transactions, savingsGoals, onSyncComplete }) {
    const totalLimit = budget.reduce((sum, b) => sum + b.monthlyLimit, 0)
    const totalSpent = budget.reduce((sum, b) => sum + b.spent, 0)
    const remaining = totalLimit - totalSpent
    const recentTransactions = transactions.slice(-5).reverse()

    return (
        <div>
            {/* pass onSyncComplete into ConnectBank so it can
                trigger a data refresh after the sync finishes */}
            <ConnectBank onSyncComplete={onSyncComplete} />

            <div className="stat-grid">
                <div className="stat-card">
                    <p className="stat-label">Total Budget</p>
                    <p className="stat-value">${totalLimit}</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Total Spent</p>
                    <p className="stat-value spent">${totalSpent}</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Remaining</p>
                    <p className="stat-value remaining">${remaining}</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Transactions</p>
                    <p className="stat-value">{transactions.length}</p>
                </div>
            </div>

            <h2>Budget Overview</h2>
            <div className="card">
                {budget.length === 0
                    ? <p className="empty">No budgets yet.</p>
                    : budget.map(b => (
                        <div className="budget-row" key={b.id}>
                            <div className="budget-row-top">
                                <span className="budget-name">{b.category}</span>
                                <span className="budget-amount">${b.spent} / ${b.monthlyLimit}</span>
                            </div>
                            <div className="bar-track">
                                <div className="bar-fill" style={{width: `${Math.min((b.spent / b.monthlyLimit) * 100, 100)}%`}}></div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <h2>Recent Transactions</h2>
            <div className="card">
                {recentTransactions.length === 0
                    ? <p className="empty">No transactions yet.</p>
                    : recentTransactions.map(t => (
                        <div className="transaction-row" key={t.id}>
                            <span className="transaction-date">{t.date}</span>
                            <span className="transaction-category">{t.category}</span>
                            <span className="transaction-description">{t.description}</span>
                            <span className="transaction-amount">-${t.amount}</span>
                        </div>
                    ))
                }
            </div>

            <h2>Savings Goals</h2>
            <div className="card">
                {savingsGoals.length === 0
                    ? <p className="empty">No savings goals yet.</p>
                    : savingsGoals.map(g => (
                        <div className="budget-row" key={g.id}>
                            <div className="budget-row-top">
                                <span className="budget-name">{g.goalName}</span>
                                <span className="budget-amount">${g.savedSoFar} / ${g.targetAmount}</span>
                            </div>
                            <div className="savings-bar-track">
                                <div className="savings-bar-fill" style={{width: `${Math.min((g.savedSoFar / g.targetAmount) * 100, 100)}%`}}></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard;