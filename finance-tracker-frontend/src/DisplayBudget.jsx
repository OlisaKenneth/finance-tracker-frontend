// import {useEffect, useState} from "react";


function DisplayBudget(props){


    return(
        <div>
            <h2>List of Budgets</h2>
            {props.budget.map(budget=>(<p key={budget.id}>{budget.category} - ${budget.monthlyLimit}
                <button onClick={()=> props.handleDelete(budget.id)}>Delete</button>
            </p>))}

        </div>
    )
}
export default DisplayBudget;