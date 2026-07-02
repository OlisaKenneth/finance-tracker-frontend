import { useState } from "react";
import apiClient from "../apiClient";

function useForm(fetchBudgets) {
    const [category, setCategory] = useState("")
    const [limit, setLimit] = useState(0)

    function handleCategory(e) {
        setCategory(e.target.value)
    }

    function handleLimit(e) {
        setLimit(e.target.value)
    }

    const values = {
        category: category,
        monthlyLimit: limit
    }

    async function handleBuudget() {
        try {
            const data = await apiClient("/api/budgets", {
                method: 'POST',
                body: JSON.stringify(values)
            })
            console.log("budget created: ", data)
            fetchBudgets()
        } catch (error) {
            console.error("Error creating budget:", error)
        }

        setCategory("")
        setLimit(0)
    }

    return { handleBuudget, handleCategory, handleLimit, category }

}
export default useForm;