function Form(props) {
    return (
        <div className="card">
            <h3>Add Budget</h3>
            <div className="form-row">
                <input type="text" value={props.category} placeholder="Category" onChange={props.handleCategory} />
                <input type="number" value={props.limit} placeholder="Monthly Limit" onChange={props.handleLimit} />
                <button onClick={props.handleBuudget}>Add</button>
            </div>
        </div>
    )
}

export default Form;