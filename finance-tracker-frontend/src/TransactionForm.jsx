function TransactionForm(props) {
    return (
        <div className="card">
            <h3>Add Transaction</h3>
            <div className="form-row">
                <input type="number" placeholder="Amount" value={props.amount} onChange={(e) => props.setAmount(e.target.value)} />
                <input type="text" placeholder="Category" value={props.category} onChange={(e) => props.setCategory(e.target.value)} />
                <input type="text" placeholder="Description" value={props.description} onChange={(e) => props.setDescription(e.target.value)} />
                <input type="date" value={props.date} onChange={(e) => props.setDate(e.target.value)} />
                <button onClick={props.handleSubmit}>Add</button>
            </div>
        </div>
    )
}

export default TransactionForm;