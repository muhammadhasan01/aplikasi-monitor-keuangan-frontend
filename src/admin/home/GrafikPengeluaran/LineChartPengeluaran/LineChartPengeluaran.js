import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { FiRefreshCcw } from "react-icons/all";
import { RKADataService } from "_services";
import { dataLineChartPengeluaran } from "./data-line-chart-pengeluaran";

class LineChartPengeluaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RKAs: null,
      selectedYear: null,
    };
  }

  componentDidMount() {
    this.retrieveRKA();
    this.setState({ selectedYear: new Date().getFullYear() });
  }

  handleChangeYear = ({ target: { value } }) => {
    this.setState({ selectedYear: Number(value) });
  };

  retrieveRKA = () => {
    RKADataService.getAllRKA()
      .then((response) => {
        this.setState({ RKAs: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { RKAs, selectedYear } = this.state;
    if (!RKAs) {
      return (
        <Container className="row d-flex justify-content-center">
          <h3 className="mx-5 pt-4">Loading grafik...</h3>
          <div className="loader" />
        </Container>
      );
    }
    const curYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) years.push(curYear - i);
    const data = dataLineChartPengeluaran.getData(RKAs, selectedYear);
    const options = dataLineChartPengeluaran.getOptions();
    return (
      <Container fluid className="mt-4" style={{ width: "80%" }}>
        <h2>Line Chart Pengeluaran</h2>
        <Form>
          <Form.Group controlId="select-year-form">
            <Form.Label>Pilih Tahun</Form.Label>
            <Form.Control as="select" onChange={this.handleChangeYear}>
              {years.map((year, id) => {
                return (
                  <option key={id} value={year}>
                    {year}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          className="float-right"
          variant="success"
          onClick={this.retrieveRKA}
        >
          Refresh <FiRefreshCcw />
        </Button>
        <Line data={data} options={options} />
      </Container>
    );
  }
}

export default LineChartPengeluaran;
