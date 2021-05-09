import { Table, Button } from 'react-bootstrap';

function FilterUnitComponent(props){

  function renderUnitOptions(){
    let unit_elements = [];
    let unit_list = props.Units;
    unit_list.forEach(unit =>{
      unit_elements.push(
        <option 
          value={unit}
        >
          {unit}
        </option>
      );
    });
    return unit_elements;
  }

  function renderSubunitOptions(){
    let subunit_elements = [];
    let subunit_list = props.Subunits;
    subunit_list.forEach(subunit =>{
      subunit_elements.push(
        <option 
          value={subunit}
        >
          {subunit}
        </option>
      );
    });
    return subunit_elements;
  }

  return (
    <div>
      <select 
        id="filter-unit"
        required
        value={props.currentUnit}
        onChange={props.onChangeUnit}
        name="filter-unit" 
      >
        {renderUnitOptions()}
      </select>
      <select 
        id="filter-subunit"
        required
        value={props.currentSubunit}
        onChange={props.onChangeSubunit}
        name="filter-subunit" 
      >
        {renderSubunitOptions()}
      </select>
      <Button onClick={props.onClickSortByDate}>Sort By Date</Button>
    </div>
  )
}

export default FilterUnitComponent;