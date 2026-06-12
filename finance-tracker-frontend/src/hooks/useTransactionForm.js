import { useState } from "react";

function useTransactionForm(fetchTransactions) {
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    function handleSubmit() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/transactions", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, category, description, date })
        })
            .then(res => res.json())
            .then(data => {
                console.log("transaction created: ", data)
                fetchTransactions()
                setAmount(0)
                setCategory("")
                setDescription("")
                setDate("")
            })
    }

    return { amount, category, description, date, setAmount, setCategory, setDescription, setDate, handleSubmit }
}

export default useTransactionForm;