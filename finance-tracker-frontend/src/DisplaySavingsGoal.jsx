import { useState } from "react";

function DisplaySavingsGoal({ savingsGoals, addToSavings }) {
    const [selectedId, setSelectedId] = useState("")
    const [amount, setAmount] = useState("")

    const selected = savingsGoals.find(g => g.id === parseInt(selectedId))

    if (!savingsGoals.length) return <p>No savings goals set.</p>

    return (
        <div>
            <h2>Savings Goal</h2>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                <option value="">Select a goal</option>
                {savingsGoals.map(g => (
                    <option key={g.id} value={g.id}>{g.goalName}</option>
                ))}
            </select>

            {selected && (
                <div>
                    <p>Goal: {selected.goalName}</p>
                    <p>Saved: ${selected.savedSoFar} / ${selected.targetAmount}</p>
                    <p>Progress: {((selected.savedSoFar / selected.targetAmount) * 100).toFixed(2)}%</p>
                    <p>Monthly Target: ${(selected.targetAmount / selected.months).toFixed(2)}</p>
                    <input
                        type="number"
                        placeholder="Amount to add"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button onClick={() => {
                        addToSavings(selected.goalName, amount)
                        setAmount("")
                    }}>Add to Savings</button>
                </div>
            )}
        </div>
    )
}

export default DisplaySavingsGoal;