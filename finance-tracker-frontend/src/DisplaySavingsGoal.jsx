import { useState } from "react";

function DisplaySavingsGoal({ savingsGoal, addToSavings }) {
    const [amount, setAmount] = useState("")

    if (!savingsGoal) return <p>No savings goal set.</p>

    const progress = ((savingsGoal.savedSoFar / savingsGoal.targetAmount) * 100).toFixed(2)

    return (
        <div>
            <h2>Savings Goal</h2>
            <p>Goal: {savingsGoal.goalName}</p>
            <p>Saved: ${savingsGoal.savedSoFar} / ${savingsGoal.targetAmount}</p>
            <p>Progress: {progress}%</p>
            <p>Monthly Target: ${(savingsGoal.targetAmount / savingsGoal.months).toFixed(2)}</p>
            <input
                type="number"
                placeholder="Amount to add"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={() => {
                addToSavings(savingsGoal.goalName, amount)
                setAmount("")
            }}>Add to Savings</button>
        </div>
    )
}

export default DisplaySavingsGoal;