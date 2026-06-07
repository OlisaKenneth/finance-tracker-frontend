
function Form(props){







    return(
        <div>
            <input type='text' value={props.category} placeholder= {"Enter Category"} onChange={props.handleCategory} />
            <input type="number" value = {props.limit} placeholder= {"Enter Monthly Limit"} onChange={props.handleLimit}/>
            <button onClick={props.handleBuudget}>Submit</button>
        </div>
    )
}
export default Form