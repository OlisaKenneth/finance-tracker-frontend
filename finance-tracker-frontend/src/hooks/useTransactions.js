import { useState, useEffect } from "react";

function useTransactions() {
    const [transactions, setTransactions] = useState([])

    function fetchTransactions() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/transactions")
            .then(res => res.json())
            .then(data => setTransactions(data))
    }

    useEffect(() => fetchTransactions(), [])

    return { transactions, fetchTransactions }
}

export default useTransactions;