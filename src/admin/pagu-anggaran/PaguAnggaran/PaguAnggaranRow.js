function PaguAnggaranRow(props){
    
    function renderColumns(){
      if (props.editMode){
        return InputADOColumns();
      } else {
        return ADOColumns();
      }
    }
    
    function ADOColumns(){
      let elements = [];
      let ado_list = props.ados;
      ado_list.forEach(ado =>{
        elements.push(
          <td><p>{ado.allocation}</p></td>
        );
      });
      return elements;
    }

    function InputADOColumns(){
      let elements = [];
      let ado_list = props.ados;
      ado_list.forEach(ado =>{
        elements.push(
          <td>
            <input
              name={props.unit + " " + props.subunit + " " + ado.name}
              type="number"
              required
              value={ado.allocation}
              onChange={props.onChange}
              min={0}
            />
          </td>
        );
      });
      return elements;
    }

    return (
      <tr>
        <td><p>{props.unit}</p></td>
        <td><p>{props.subunit}</p></td>
        {renderColumns()}
        <td><p>{props.total}</p></td>
      </tr>
    )
  }

export default PaguAnggaranRow;