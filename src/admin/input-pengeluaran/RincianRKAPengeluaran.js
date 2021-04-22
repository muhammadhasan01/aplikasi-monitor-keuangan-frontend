import React, { Component } from 'react';

class RincianRKAPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRKAEmpty: true
        }
    }

    toggleShowRKAEmpty = () => {
        const newState = !this.state.showRKAEmpty;
        this.setState({ showRKAEmpty: newState });
    }

    render() {
        if (!this.props || !this.props.RKA || !this.props.inputs) {
            return null;
        }
        const RKA = this.props.RKA;
        const { unit, subunit, ADO } = this.props.inputs;
        const title = `Rincian RKA ${ADO} ${subunit} ${unit}`;
        if (RKA.length === 0) {
            return (
                <>
                    {this.state.showRKAEmpty ?
                        <div className='alert alert-info'>
                            Belum ada data {title}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                                    onClick={this.toggleShowRKAEmpty}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> : null
                    }
                </>
            )
        }
        const timeSlot = "Triwulan 1";
        return (
            <>
                <h2 className='mt-2'>{title}</h2>
                <p>Select Rentang Waktu</p> { /*TODO: buat rentang waktu*/ }
                <table className='table'>
                    <thead className='thead-dark'>
                        <th scope='col'>Rincian Belanja</th>
                        <th scope='col'>Alokasi Total</th>
                        <th scope='col'>Alokasi {timeSlot}</th>
                        <th scope='col'>Penggunaan {timeSlot}</th>
                        <th scope='col'>Sisa Anggaran {timeSlot}</th>
                        <th scope='col'>Aksi</th>
                    </thead>
                </table>
            </>
        )
    }
}

export default RincianRKAPengeluaran;