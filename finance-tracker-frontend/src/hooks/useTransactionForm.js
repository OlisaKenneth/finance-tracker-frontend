import { useState } from "react";
import apiClient from "../api/apiClient.js";

function useTransactionForm(fetchTransactions, fetchBudgets) {
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    async function handleSubmit() {
        try {
            const data = await apiClient("/api/transactions", {
                method: 'POST',
                body: JSON.stringify({ amount, category, description, date })
            })
            console.log("transaction created: ", data)
            fetchTransactions()
            fetchBudgets()
            setAmount("")
            setCategory("")
            setDescription("")
            setDate("")
        } catch (error) {
            console.error("Error creating transaction:", error)
        }
    }

    return { amount, category, description, date, setAmount, setCategory, setDescription, setDate, handleSubmit }
}

export default useTransactionForm;