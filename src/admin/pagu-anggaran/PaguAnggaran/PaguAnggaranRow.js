function PaguAnggaranRow(props){
    
    function ADOColumns(ados){
      let elements = [];
      let ado_list = ados;
      ado_list.forEach(ado =>{
        elements.push(
          <td><p>{ado}</p></td>
        );
      });
      return elements;
    }

    function InputADOColumns(ados){
      let elements = [];
      let ado_list = ados;
      ado_list.forEach(ado =>{
        elements.push(
          <td>
            <input
              name={props.unit + " " + props.subunit + " " + ado.name}
              type="number"
              required
              value={ado.value}
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
        {this.ADOColumns(props.ados)}
        <td><p>{props.total}</p></td>
      </tr>
    )
  }

export default PaguAnggaranRow;