import { useState, useEffect } from "react";

function useSavingsGoal() {
    const [savingsGoals, setSavingsGoals] = useState([])

    function fetchSavingsGoal() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/savings_goal")
            .then(res => res.json())
            .then(data => setSavingsGoals(data))  // ← store all, not just [0]
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

    return { savingsGoals, createSavingsGoal, addToSavings }
}

export default useSavingsGoal;