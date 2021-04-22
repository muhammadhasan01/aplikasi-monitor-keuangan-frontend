function EditPaguForm(props){

  function ADOInputs(){
    let inputs = [];
    let ado_list = props.ados;
    ado_list.forEach(ado =>{
      inputs.push(
        <div>
          <label>{ado.name}</label>
          <input
            name={props.unit + " " + props.subunit + " " + ado.name}
            type="number"
            required
            value={ado.allocation}
            onChange={props.onChange}
            min={0}
          />
        </div>
      );
    });
    return inputs;
  }

    return (
      <div id="form-container">
        <h3>{props.unit}</h3>
        <h2>{props.subunit}</h2>
        <form id="edit-pagu-form">
          {ADOInputs()}
        </form>
        <button onClick={() => props.hide()}>Cancel</button>
        <button onClick={() => props.submit()}>Submit</button>
      </div>
    )
  }

  export default EditPaguForm;