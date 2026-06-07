// import {useState, useEffect} from "react";

import {useEffect, useState} from "react";

function DisplayBudget(){
    const[budget, createBudget] = useState([])

    useEffect(() => {
        fetch("https://finance-tracker-production-1547.up.railway.app/api/budgets")
            .then(res=>res.json())
            .then(data=> createBudget(data))
    })

    return(
        <div>
            <h2>List of Budgets</h2>
            {budget.map(budget=>(<p key={budget.id}>{budget.category} - ${budget.monthlyLimit}</p>))}
        </div>
    )
}
export default DisplayBudget;