import { useState } from "react";

function BudgetItem({ budget, handleDelete, handleUpdate }) {
    const [newLimit, setNewLimit] = useState("")

    return (
        <p key={budget.id}>
            {budget.category} - ${budget.monthlyLimit}
            <button onClick={() => handleDelete(budget.id)}>Delete</button>
            <input
                type='number'
                placeholder={'New limit'}
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
            />
            <button onClick={() => handleUpdate(budget.id, newLimit, budget.category)}>Update</button>
        </p>
    )
}

function DisplayBudget(props) {
    return (
        <div>
            <h2>List of Budgets</h2>
            {props.budget.map(budget => (
                <BudgetItem
                    key={budget.id}
                    budget={budget}
                    handleDelete={props.handleDelete}
                    handleUpdate={props.handleUpdate}
                />
            ))}
        </div>
    )
}

export default DisplayBudget;