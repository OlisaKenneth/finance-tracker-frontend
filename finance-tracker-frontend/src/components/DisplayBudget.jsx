import { useState } from "react";

function BudgetItem({ budget, handleDelete, handleUpdate }) {
    const [newLimit, setNewLimit] = useState("")

    return (
        <div className="budget-row">
            <div className="budget-row-top">
                <span className="budget-name">{budget.category}</span>
                <span className="budget-amount">${budget.spent} / ${budget.monthlyLimit}</span>
            </div>
            <div className="bar-track">
                <div className="bar-fill" style={{width: `${Math.min((budget.spent / budget.monthlyLimit) * 100, 100)}%`}}></div>
            </div>
            <div className="budget-actions">
                <button className="delete" onClick={() => handleDelete(budget.id)}>Delete</button>
                <input type="number" placeholder="New limit" value={newLimit} onChange={(e) => setNewLimit(e.target.value)} />
                <button className="update" onClick={() => { handleUpdate(budget.id, newLimit, budget.category); setNewLimit("") }}>Update</button>
            </div>
        </div>
    )
}

function DisplayBudget(props) {
    return (
        <div>
            <h2>Budgets</h2>
            <div className="card">
                {props.budget.map(budget => (
                    <BudgetItem
                        key={budget.id}
                        budget={budget}
                        handleDelete={props.handleDelete}
                        handleUpdate={props.handleUpdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default DisplayBudget;