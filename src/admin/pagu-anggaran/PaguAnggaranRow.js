import { Button, InputGroup, FormControl } from "react-bootstrap";

function PaguAnggaranRow(props) {
  function renderColumns() {
    if (props.editMode) {
      return InputADOColumns();
    } else {
      return ADOColumns();
    }
  }

  function ADOColumns() {
    let elements = [];
    let ado_list = props.data.ados;
    ado_list.forEach((ado) => {
      elements.push(
        <td>
          <p>{ado.alokasi}</p>
        </td>
      );
    });
    return elements;
  }

  function InputADOColumns() {
    let elements = [];
    let ado_list = props.data.ados;
    ado_list.forEach((ado) => {
      elements.push(
        <td>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              id={props.data.unit + " " + props.data.subunit + " " + ado.name}
              type="number"
              required
              value={ado.alokasi}
              onChange={props.onChange}
              min={0}
              style={{ minWidth: "100px" }}
            />
          </InputGroup>
        </td>
      );
    });
    return elements;
  }

  const handleClickEdit = () => {
    if (props.onClickEdit) {
      props.onClickEdit(props);
    }
  };

  return (
    <tr>
      <td>
        <p>{props.data.unit}</p>
      </td>
      <td>
        <p>{props.data.subunit}</p>
      </td>
      {renderColumns()}
      <td>
        <p>{props.data.total}</p>
      </td>
      <td>
        <Button onClick={() => handleClickEdit()}>Edit</Button>
      </td>
    </tr>
  );
}

export default PaguAnggaranRow;