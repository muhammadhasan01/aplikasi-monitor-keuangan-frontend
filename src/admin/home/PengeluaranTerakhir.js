import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {formatRupiah, formatTanggal} from "_helpers";
import { pengeluaranDataService } from "_services";

const title = "Pengeluaran Terakhir";
const headValues = ["Tanggal", "Jumlah", "Unit", "Subunit", "Rincian Belanja"];

class PengeluaranTerakhir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pengeluaran: null
        };
    }

    componentDidMount() {
        this.retrievePengeluaran();
    }

    retrievePengeluaran = () => {
        pengeluaranDataService.getAllPengeluaran()
            .then(response => {
                console.log(response);
                this.setState({ pengeluaran: response.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { pengeluaran } = this.state;
        if (!pengeluaran || pengeluaran.length === 0) {
            return <h2>Belum ada pengeluaran terakhir</h2>
        }
        return (
            <>
                <h2>{title}</h2>
                <Table responsive striped bordered hover style={{backgroundColor: 'lightblue'}}>
                    <thead>
                    {headValues.map((head, idx) => {
                        return (
                            <th key={idx} className='center'>
                                {head}
                            </th>
                        )
                    })}
                    </thead>
                    <tbody>
                    {pengeluaran.map((p, idx) => {
                        const { RKA: { unit, sub_unit, rincian_belanja }, createdAt: tanggal } = p;
                        const tanggalFormatted = formatTanggal(tanggal);
                        return (
                            <tr key={idx}>
                                <td>{tanggalFormatted}</td>
                                <td>{formatRupiah(p.jumlah)}</td>
                                <td>{unit}</td>
                                <td>{sub_unit}</td>
                                <td>{rincian_belanja}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default PengeluaranTerakhir;