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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://finance-tracker-production-1547.up.railway.app/api/budgets/${id}`, {
                method: 'DELETE', // Specify the HTTP method
            });

            if (response.ok) {
                // 2. Remove the item from React state to update the UI
                createBudget(budget.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };




    return(
    <>
        <DisplayBudget handleDelete={handleDelete} budget={budget}/>
        <Form handleBuudget={handleBuudget} handleCategory={handleCategory} handleLimit={handleLimit} category={category}
              limit={limit}/>
    </>
)

}

export default App
