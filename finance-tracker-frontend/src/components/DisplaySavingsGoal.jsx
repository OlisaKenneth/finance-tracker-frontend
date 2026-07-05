import { useState } from "react";

function DisplaySavingsGoal({ savingsGoals, addToSavings }) {
    const [selectedId, setSelectedId] = useState("")
    const [amount, setAmount] = useState("")

    const selected = savingsGoals.find(g => g.id === parseInt(selectedId))

    if (!savingsGoals.length) return (
        <div>
            <h2>Savings Goal</h2>
            <div className="card">
                <p className="empty">No savings goals set.</p>
            </div>
        </div>
    )

    const progress = selected
        ? ((selected.savedSoFar / selected.targetAmount) * 100).toFixed(2)
        : 0

    return (
        <div>
            <h2>Savings Goal</h2>
            <div className="card">
                <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                    <option value="">Select a goal</option>
                    {savingsGoals.map(g => (
                        <option key={g.id} value={g.id}>{g.goalName}</option>
                    ))}
                </select>

                {selected && (
                    <div style={{marginTop: "16px"}}>
                        <p className="savings-amount">${selected.savedSoFar}</p>
                        <p className="savings-target">of ${selected.targetAmount}</p>
                        <div className="savings-bar-track">
                            <div className="savings-bar-fill" style={{width: `${progress}%`}}></div>
                        </div>
                        <div className="savings-stats">
                            <span>{progress}% complete</span>
                            <span>${(selected.targetAmount / selected.months).toFixed(2)}/mo target</span>
                        </div>
                        <div className="form-row">
                            <input type="number" placeholder="Amount to add" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <button className="savings" onClick={() => { addToSavings(selected.goalName, amount); setAmount("") }}>Add to Savings</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplaySavingsGoal;