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
import {Routes, Route, Link} from "react-router-dom"

function App() {
    const { budget, fetchBudgets, handleDelete, handleUpdate } = useBudgets()
    const { category, limit, handleCategory, handleLimit, handleBuudget } = useForm(fetchBudgets)
    const { transactions, fetchTransactions } = useTransactions()
    const { amount, category: tCategory, description, date,
        setAmount, setCategory, setDescription, setDate,
        handleSubmit } = useTransactionForm(fetchTransactions, fetchBudgets)
    const { savingsGoals, createSavingsGoal, addToSavings } = useSavingsGoal()

    return (
        <>
            <div className="page-header">
                <p className="page-title">Finance Tracker</p>
                <p className="page-subtitle">Track your spending, savings, and goals</p>
            </div>

            <nav style={{display: "flex", gap: "16px", marginBottom: "32px"}}>
                <Link to="/budgets">Budgets</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to="/savings">Savings</Link>
            </nav>

            <Routes>
                <Route path="/" element={
                    <p className="empty">Welcome — use the nav above to get started.</p>
                } />


                <Route path="/budgets" element={
                    <>
                        <DisplayBudget
                            budget={budget}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />

                        <Form
                            handleBuudget={handleBuudget}
                            handleCategory={handleCategory}
                            handleLimit={handleLimit}
                            category={category}
                            limit={limit}
                        />
                    </>
                } />

                <Route path="/transactions" element={
                    <>
                        <DisplayTransactions
                            transactions={transactions}
                        />

                        <TransactionForm amount={amount}
                                     category={tCategory}
                                     description={description}
                                     date={date}
                                     setAmount={setAmount}
                                     setCategory={setCategory}
                                     setDescription={setDescription}
                                     setDate={setDate}
                                     handleSubmit={handleSubmit}
                        />

                    </>

                }
                />


                <Route path="/savings" element={
                    <>
                        <DisplaySavingsGoal
                            savingsGoals={savingsGoals}
                            addToSavings={addToSavings}
                        />

                        <SavingsGoalForm
                            createSavingsGoal={createSavingsGoal}
                        />

                    </>

                }
                />


            </Routes>

        </>
    )
}

export default App