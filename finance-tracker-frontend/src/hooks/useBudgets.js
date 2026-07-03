import { useState, useEffect } from "react";
import apiClient from "../apiClient";

function useBudgets() {
    const [budget, createBudget] = useState([])

    async function fetchBudgets() {
        try {
            const data = await apiClient("/api/budgets");
            createBudget(data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    }

    useEffect(() => {
        fetchBudgets()
    }, [])

    const handleDelete = async (id) => {
        try {
            await apiClient(`/api/budgets/${id}`, { method: 'DELETE' });
            createBudget(budget.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const handleUpdate = async (id, newLimit, category) => {
        try {
            await apiClient(`/api/budgets/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    category: category,
                    monthlyLimit: newLimit
                })
            });
            fetchBudgets()
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return { budget, fetchBudgets, handleDelete, handleUpdate }
}

export default useBudgets;