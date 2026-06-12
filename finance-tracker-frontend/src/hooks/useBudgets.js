import {useState, useEffect} from "react";

function useBudgets() {
    const [budget, createBudget] = useState([])

    function fetchBudgets() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/budgets")
            .then(res => res.json())
            .then(data => createBudget(data))
    }

    useEffect(() => fetchBudgets(), [])

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://finance-tracker-production-1547.up.railway.app/api/budgets/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                createBudget(budget.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };



    const handleUpdate = async (id, newLimit, category) => {
        try {
            const response = await fetch(`https://finance-tracker-production-1547.up.railway.app/api/budgets/${id}`, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    category: category,
                    monthlyLimit: newLimit
                })
            });
            if (response.ok) {
                fetchBudgets()
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return { budget, fetchBudgets, handleDelete, handleUpdate }
}

export default useBudgets;