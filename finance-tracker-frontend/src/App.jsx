import {useEffect, useState} from "react";
import DisplayBudget from "./DisplayBudget.jsx";
import Form from "./Form.jsx";
function App() {


//fetchBudgets to get the data
    const[budget, createBudget] = useState([])
    function fetchBudgets(){
        fetch("https://finance-tracker-production-1547.up.railway.app/api/budgets")
            .then(res=>res.json())
            .then(data=> createBudget(data))
    }

//for displayBudget we use this to display them in a list
    useEffect(() => fetchBudgets(), [])


//for Form
    const [category, setCategory] = useState("")
    const [limit, setLimit] = useState(0)
    function handleCategory(e){
        setCategory(e.target.value)
    }

    function handleLimit(e){
        setLimit(e.target.value)
    }

    const values = {
        category:category,
        monthlyLimit:limit
    }

    function handleBuudget(){

        fetch("https://finance-tracker-production-1547.up.railway.app/api/budgets", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
            .then(res=>res.json())
            .then(data=>{
                console.log("budget created: ",data)
                fetchBudgets()
            })

        setCategory("")
        setLimit(0)
    }





    return(
    <>
        <DisplayBudget budget={budget}/>
        <Form handleBuudget={handleBuudget} handleCategory={handleCategory} handleLimit={handleLimit} category={category}
              limit={limit}/>
    </>
)

}

export default App
