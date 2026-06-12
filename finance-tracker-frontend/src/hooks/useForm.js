import {useState} from "react";

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


    function handleBuudget() {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/budgets", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                console.log("budget created: ", data)
                fetchBudgets()
                setCategory("")
                setLimit(0)
            })

        setCategory("")
        setLimit(0)
    }

    return {handleBuudget, handleCategory, handleLimit, category}

}
export default useForm;