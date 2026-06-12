import useForm from './hooks/useForm.js'
import useBudgets from './hooks/useBudgets.js'
import Form from "./Form.jsx";
import DisplayBudget from "./DisplayBudget.jsx";
function App() {


    const { budget, fetchBudgets, handleDelete, handleUpdate } = useBudgets()
    const { category, limit, handleCategory,
        handleLimit, handleBuudget } = useForm(fetchBudgets)



    return(
    <>
        <DisplayBudget handleDelete={handleDelete} handleUpdate={handleUpdate} budget={budget}/>
        <Form handleBuudget={handleBuudget} handleCategory={handleCategory} handleLimit={handleLimit} category={category}
              limit={limit}/>
    </>
)

}

export default App
