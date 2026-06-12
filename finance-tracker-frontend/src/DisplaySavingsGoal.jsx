function DisplaySavingsGoal({ savingsGoal }) {
    if (!savingsGoal) return <p>No savings goal set.</p>

    const progress = ((savingsGoal.savedSoFar / savingsGoal.targetAmount) * 100).toFixed(2)

    return (
        <div>
            <h2>Savings Goal</h2>
            <p>Goal: {savingsGoal.goalName}</p>
            <p>Saved: ${savingsGoal.savedSoFar} / ${savingsGoal.targetAmount}</p>
            <p>Progress: {progress}%</p>
            <p>Monthly Target: ${(savingsGoal.targetAmount / savingsGoal.months).toFixed(2)}</p>
        </div>
    )
}

export default DisplaySavingsGoal;