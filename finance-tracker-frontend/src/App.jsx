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
import {Routes, Route, NavLink} from "react-router-dom"
import Dashboard from "./Dashboard.jsx"
import { useState } from "react"
import Auth from "./Auth"

function App() {
    const { budget, fetchBudgets, handleDelete, handleUpdate } = useBudgets()
    const { category, limit, handleCategory, handleLimit, handleBuudget } = useForm(fetchBudgets)
    const { transactions, fetchTransactions, handleDeleteTransaction } = useTransactions()
    const { amount, category: tCategory, description, date,
        setAmount, setCategory, setDescription, setDate,
        handleSubmit } = useTransactionForm(fetchTransactions, fetchBudgets)
    const { savingsGoals, fetchSavingsGoal, createSavingsGoal, addToSavings } = useSavingsGoal()

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))

    // Runs right after a successful login. The hooks above already
    // fired their ONE fetch when the page first loaded — back then
    // there was no token yet, so they came back empty. Now that we
    // actually have a token, we manually tell each hook to fetch
    // again so the dashboard fills in without needing a refresh.
    function handleLoginSuccess() {
        setIsLoggedIn(true)
        fetchBudgets()
        fetchTransactions()
        fetchSavingsGoal()
    }

    // Clears the saved token and sends the user back to the
    // login screen. No API call needed — logging out is just
    // "forget the token we were holding onto."
    function handleLogout() {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    if (!isLoggedIn) {
        return <Auth onLogin={handleLoginSuccess} />
    }

    return (
        <>
            <header className="app-header">
                <p className="app-logo">Finance Tracker</p>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/budgets">Budgets</NavLink>
                    <NavLink to="/transactions">Transactions</NavLink>
                    <NavLink to="/savings">Savings</NavLink>
                    <button className="logout-btn" onClick={handleLogout}>Log out</button>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={
                    <Dashboard
                        budget={budget}
                        transactions={transactions}
                        savingsGoals={savingsGoals}
                    />
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
                            handleDeleteTransaction={handleDeleteTransaction}
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

            <footer className="app-footer">
                <p>Finance Tracker — Built by Kenneth Olisa</p>
                <p>
                    <a href="https://github.com/OlisaKenneth/finance-tracker" target="_blank">GitHub</a>
                    <a href="https://olisakenneth.netlify.app" target="_blank">Portfolio</a>
                </p>
            </footer>

        </>
    )
}

export default App