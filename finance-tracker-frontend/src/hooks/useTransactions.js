import { useState, useEffect } from "react";

function useTransactions() {
    const [transactions, setTransactions] = useState([])

    function fetchTransactions() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/transactions")
            .then(res => res.json())
            .then(data => setTransactions(data))
    }

    useEffect(() => fetchTransactions(), [])

    const handleDeleteTransaction = async (id) => {
        try {
            const response = await fetch(`https://finance-tracker-production-1547.up.railway.app/api/transactions/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                setTransactions(transactions.filter(t => t.id !== id))
            }
        } catch (error) {
            console.error('Error deleting transaction:', error)
        }
    }

    return { transactions, fetchTransactions, handleDeleteTransaction }
}

export default useTransactions;