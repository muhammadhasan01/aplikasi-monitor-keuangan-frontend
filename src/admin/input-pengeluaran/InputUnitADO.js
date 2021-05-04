import React, { Component } from 'react';
import {RKADataService} from "_services";

class InputUnitADO extends Component {
    constructor(props) {
        super(props);
        this.userInput = React.createRef();
    }

    getRKA = (e) => {
        e.preventDefault();
        const node = this.userInput.current;
        const unit = node[0].value, subunit = node[1].value, ADO = node[2].value;
        RKADataService.getRKAUnitADO(unit, subunit, ADO)
            .then(response => {
                this.props.sendDataRKA(response.data, { unit, subunit, ADO });
            }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { data } = this.props;
        return (
            <>
                <h2 className='mt-3'>Input Pengeluaran Unit</h2>
                <form className="form-group" ref={this.userInput}>
                    <label htmlFor="select-unit">Select Unit</label>
                    <select className="form-select form-select-sm" id="select-unit">
                        { data.units.map((unit, ID) => <option key={ID} value={unit}>{unit}</option>) }
                    </select>
                    <label htmlFor="select-subunit">Select Subunit</label>
                    <select className="form-select form-select-sm" id="select-subunit">
                        { data.subunits.map((subunit, ID) => <option key={ID} value={subunit}>{subunit}</option>) }
                    </select>
                    <label htmlFor="select-ADO">Select ADO</label>
                    <select className="form-select form-select-sm" id="select-ADO">
                        { data.ADOs.map((ADO, ID) => <option key={ID} value={ADO}>{ADO}</option>) }
                    </select> <br />
                    <button className='btn btn-primary mt-2' onClick={this.getRKA}>Lihat RKA</button>
                </form>
            </>
        )
    }
}

export default InputUnitADO;