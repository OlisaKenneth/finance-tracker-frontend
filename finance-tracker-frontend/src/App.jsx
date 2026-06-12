import useBudgets from './hooks/useBudgets.js'
import useForm from './hooks/useForm.js'
import useTransactions from './hooks/useTransactions.js'
import useTransactionForm from './hooks/useTransactionForm.js'
import useSavingsGoal from './hooks/useSavingsGoal.js'
import DisplayBudget from "./DisplayBudget.jsx"
import Form from "./Form.jsx"
import DisplayTransactions from "./DisplayTransactions.jsx"
import TransactionForm from "./TransactionForm.jsx"
import DisplaySavingsGoal from "./DisplaySavingsGoal.jsx"
import SavingsGoalForm from "./SavingsGoalForm.jsx"

function App() {
    const { budget, fetchBudgets, handleDelete, handleUpdate } = useBudgets()
    const { category, limit, handleCategory, handleLimit, handleBuudget } = useForm(fetchBudgets)
    const { transactions, fetchTransactions } = useTransactions()
    const { amount, category: tCategory, description, date,
        setAmount, setCategory, setDescription, setDate,
        handleSubmit } = useTransactionForm(fetchTransactions)
    const { savingsGoal, fetchSavingsGoal, createSavingsGoal } = useSavingsGoal()

    return (
        <>
            <DisplayBudget handleDelete={handleDelete} handleUpdate={handleUpdate} budget={budget} />
            <Form handleBuudget={handleBuudget} handleCategory={handleCategory}
                  handleLimit={handleLimit} category={category} limit={limit} />
            <DisplayTransactions transactions={transactions} />
            <TransactionForm
                amount={amount} category={tCategory} description={description} date={date}
                setAmount={setAmount} setCategory={setCategory}
                setDescription={setDescription} setDate={setDate}
                handleSubmit={handleSubmit} />
            <DisplaySavingsGoal savingsGoal={savingsGoal} />
            <SavingsGoalForm createSavingsGoal={createSavingsGoal} />
        </>
    )
}

export default App