import React, {Component} from 'react';
import {ADODataService} from "../../_services";

class TambahRKAForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sisa: 0,

            ADOOption: [],
            JenisOption: ["Barang", "Jasa", "Modal"]
        }
    }

    componentDidMount() {
        this.renderADOOption();
        console.log(this.props.ado);
    }

    renderADOOption(){
        ADODataService.getDistinctADO()
            .then(response => {
                this.setState({ ADOOption: response.data });
                console.log(this.state.ADOOption);
            })
            .catch(err => {
                console.log(err);

            })
    }

    render(){
        return (
            <div id="form-container">
                <h3>Tambah RKA Baru</h3>
                Sisa Budget = {this.state.sisa}
                <form id="new-rka-form">

                    <div class="form-group">
                        <label>ADO</label>
                        <select id="adoOption" name="adoOption" required>
                            {this.state.ADOOption.map(ADO => (ADO === this.props.ado) ? <option value={ADO} selected>{ADO}</option> : <option value={ADO}>{ADO}</option> )}
                        </select>
                    </div>


                    <label>Kegiatan</label>
                    <input id="kegiatan" name="kegiatan" type="text" required/>

                    <label>Subkegiatan</label>
                    <input id="subkegiatan" name="subkegiatan" type="text" required/>

                    <label>Rincian Subkegiatan</label>
                    <input id="rincian_subkegiatan" name="rincian_subkegiatan" type="text" required/>

                    <label>Rincian Belanja</label>
                    <input id="rincian-belanja" name="rincian-belanja" type="text" required/>

                    <label>Jenis Belanja</label>
                    <select id="jenis" name="jenis" required>
                        {this.state.JenisOption.map(Jenis => <option value={Jenis}>{Jenis}</option>)}
                    </select>

                    <button className='btn btn-primary mt-2'>Tambah RKA</button>
                </form>
            </div>
        )
    }
}

export default TambahRKAForm;
