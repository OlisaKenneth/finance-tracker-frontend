function DisplayTransactions(props) {
    return (
        <div>
            <h2>Transactions</h2>
            <div className="card">
                {props.transactions.length === 0
                    ? <p className="empty">No transactions yet.</p>
                    : props.transactions.map(t => (
                        <div className="transaction-row" key={t.id}>
                            <span className="transaction-date">{t.date}</span>
                            <span className="transaction-category">{t.category}</span>
                            <span style={{color: "#6e6e73", fontSize: "13px"}}>{t.description}</span>
                            <span className="transaction-amount">-${t.amount}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DisplayTransactions;