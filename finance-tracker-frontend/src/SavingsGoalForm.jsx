import { useState } from "react";

function SavingsGoalForm({ createSavingsGoal }) {
    const [goalName, setGoalName] = useState("")
    const [targetAmount, setTargetAmount] = useState("")
    const [months, setMonths] = useState("")

    function handleSubmit() {
        createSavingsGoal(goalName, targetAmount, months)
        setGoalName("")
        setTargetAmount("")
        setMonths("")
    }

    return (
        <div>
            <h3>Create Savings Goal</h3>
            <input type="text" placeholder="Goal name" value={goalName}
                   onChange={(e) => setGoalName(e.target.value)} />
            <input type="number" placeholder="Target amount" value={targetAmount}
                   onChange={(e) => setTargetAmount(e.target.value)} />
            <input type="number" placeholder="Months" value={months}
                   onChange={(e) => setMonths(e.target.value)} />
            <button onClick={handleSubmit}>Create Goal</button>
        </div>
    )
}

export default SavingsGoalForm;