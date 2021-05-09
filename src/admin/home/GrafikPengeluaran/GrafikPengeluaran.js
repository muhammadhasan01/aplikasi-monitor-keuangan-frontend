import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import LineChartPengeluaran from "./LineChartPengeluaran/LineChartPengeluaran";

class GrafikPengeluaran extends Component {
    render() {
        return (
            <Container fluid className='mt-3'>
                <LineChartPengeluaran />
            </Container>
        );
    }
}

export default GrafikPengeluaran;