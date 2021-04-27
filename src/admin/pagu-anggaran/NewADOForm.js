function NewADOFOrm(props){
    return (
      <div id="form-container">
        <h3>New ADO</h3>
        <form id="new-ado-form">
          <label>Name</label>
          <input
            type="text"
            id="name"
            required
            value={props.name}
            onChange={props.onChangeName}
            name="name"
          />
          <label>Detail</label>
          <input
            type="text"
            id="detail"
            required
            value={props.detail}
            onChange={props.onChangeDetail}
            name="detail"
          />
        </form>
        <button onClick={() => props.hide()}>Cancel</button>
        <button onClick={() => props.submit()}>Submit</button>
      </div>
    )
  }

  export default NewADOFOrm;