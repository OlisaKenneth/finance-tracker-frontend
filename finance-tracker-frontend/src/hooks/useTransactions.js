import { useState, useEffect } from "react";
import apiClient from "../api/apiClient.js";

function useTransactions() {
    const [transactions, setTransactions] = useState([])

    async function fetchTransactions() {
        try {
            const data = await apiClient("/api/transactions");
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    const handleDeleteTransaction = async (id) => {
        try {
            await apiClient(`/api/transactions/${id}`, { method: 'DELETE' });
            setTransactions(transactions.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error)
        }
    }

    return { transactions, fetchTransactions, handleDeleteTransaction }
}

export default useTransactions;