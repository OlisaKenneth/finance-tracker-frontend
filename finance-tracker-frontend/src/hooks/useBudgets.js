import {useState, useEffect} from "react";


function useBudgets() {
//fetchBudgets to get the data
    const [budget, createBudget] = useState([])

    function fetchBudgets() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/budgets")
            .then(res => res.json())
            .then(data => createBudget(data))
    }

//for displayBudget we use this to display them in a list
    useEffect(() => fetchBudgets(), [])

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://finance-tracker-production-1547.up.railway.app/api/budgets/${id}`, {
                method: 'DELETE', // Specify the HTTP method
            });

            if (response.ok) {
                // 2. Remove the item from React state to update the UI
                createBudget(budget.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    return { budget, fetchBudgets, handleDelete }
}

export default useBudgets;