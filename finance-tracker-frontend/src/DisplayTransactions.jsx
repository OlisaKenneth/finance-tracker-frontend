function DisplayTransactions(props) {
    return (
        <div>
            <h2>Transactions</h2>
            {props.transactions.map(t => (
                <p key={t.id}>
                    {t.date} | {t.category} | ${t.amount} | {t.description}
                </p>
            ))}
        </div>
    )
}

export default DisplayTransactions;