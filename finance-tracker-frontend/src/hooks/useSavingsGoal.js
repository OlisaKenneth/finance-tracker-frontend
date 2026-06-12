import { useState, useEffect } from "react";

function useSavingsGoal() {
    const [savingsGoal, setSavingsGoal] = useState(null)

    function fetchSavingsGoal() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/savingsgoals")
            .then(res => res.json())
            .then(data => setSavingsGoal(data[0]))
    }

    useEffect(() => fetchSavingsGoal(), [])

    return { savingsGoal, fetchSavingsGoal }
}

export default useSavingsGoal;