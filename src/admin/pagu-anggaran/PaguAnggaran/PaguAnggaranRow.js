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

    return (
      <tr>
        <td><p>{props.unit}</p></td>
        <td><p>{"Subunit"}</p></td>
        {this.ADOColumns(props.ados)}
        <td><p>{props.total}</p></td>
        <td><button>Edit</button></td>
      </tr>
    )
  }

export default PaguAnggaranRow;