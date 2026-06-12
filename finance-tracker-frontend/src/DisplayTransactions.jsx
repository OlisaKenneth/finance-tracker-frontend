function DisplayTransactions({ transactions, handleDeleteTransaction }) {
    return (
        <div>
            <h2>Transactions</h2>
            <div className="card">
                {transactions.length === 0
                    ? <p className="empty">No transactions yet.</p>
                    : transactions.map(t => (
                        <div className="transaction-row" key={t.id}>
                            <span className="transaction-date">{t.date}</span>
                            <span className="transaction-category">{t.category}</span>
                            <span className="transaction-description">{t.description}</span>
                            <span className="transaction-amount">-${t.amount}</span>
                            <button className="delete" onClick={() => handleDeleteTransaction(t.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DisplayTransactions;