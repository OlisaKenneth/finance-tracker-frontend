import { useState, useEffect } from "react";

function useSavingsGoal() {
    const [savingsGoal, setSavingsGoal] = useState(null)

    function fetchSavingsGoal() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/savings_goal")
            .then(res => res.json())
            .then(data => setSavingsGoal(data[0]))
    }

    useEffect(() => fetchSavingsGoal(), [])



    function createSavingsGoal(goalName, targetAmount, months) {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/savings_goal", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goalName, targetAmount, months })
        })
            .then(res => res.json())
            .then(() => fetchSavingsGoal())
    }

    function addToSavings(goalName, value) {
        fetch(`https://finance-tracker-production-1547.up.railway.app/api/savings_goal/${goalName}/add?value=${value}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(() => fetchSavingsGoal())
    }

    return { savingsGoal, fetchSavingsGoal, createSavingsGoal, addToSavings }
}

export default useSavingsGoal;