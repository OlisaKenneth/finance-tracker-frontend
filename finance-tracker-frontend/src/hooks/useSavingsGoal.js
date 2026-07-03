import { useState, useEffect } from "react";
import apiClient from "../apiClient";

function useSavingsGoal() {
    const [savingsGoals, setSavingsGoals] = useState([])

    async function fetchSavingsGoal() {
        try {
            const data = await apiClient("/api/savings_goal");
            setSavingsGoals(data);
        } catch (error) {
            console.error('Error fetching savings goals:', error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSavingsGoal()
    }, [])

    async function createSavingsGoal(goalName, targetAmount, months) {
        try {
            await apiClient("/api/savings_goal", {
                method: 'POST',
                body: JSON.stringify({ goalName, targetAmount, months })
            });
            fetchSavingsGoal()
        } catch (error) {
            console.error('Error creating savings goal:', error);
        }
    }

    async function addToSavings(goalName, value) {
        try {
            await apiClient(`/api/savings_goal/${goalName}/add?value=${value}`, {
                method: 'PUT'
            });
            fetchSavingsGoal()
        } catch (error) {
            console.error('Error adding to savings:', error);
        }
    }

    return { savingsGoals, fetchSavingsGoal, createSavingsGoal, addToSavings }
}

export default useSavingsGoal;