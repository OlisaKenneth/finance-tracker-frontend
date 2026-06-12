function Dashboard({ budget, transactions, savingsGoals }) {
    const totalLimit = budget.reduce((sum, b) => sum + b.monthlyLimit, 0)
    const totalSpent = budget.reduce((sum, b) => sum + b.spent, 0)
    const remaining = totalLimit - totalSpent

    return (
        <div>
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
        </div>
    )
}

export default Dashboard;