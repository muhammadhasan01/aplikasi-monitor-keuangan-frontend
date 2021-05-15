import React, { Component } from "react";
import { UnitsDataService, ADODataService } from "_services";
import InputUnitADO from "./InputUnitADO";
import RincianRKAPengeluaran from "./RincianRKAPengeluaran";
import { Col, Container, Row } from "react-bootstrap";

export class AdminInputPengeluaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      ADOs: [],
      subunits: [],
      RKAs: null,
      inputs: null,
    };
  }

  componentDidMount() {
    this.retrieveUnits();
    this.retrieveADOs();
    this.retrieveSubunits();
  }

  retrieveUnits = () => {
    UnitsDataService.getDistinctUnits()
      .then((response) => {
        this.setState({ units: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  retrieveADOs = () => {
    ADODataService.getDistinctADO()
      .then((response) => {
        this.setState({ ADOs: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  retrieveSubunits = () => {
    UnitsDataService.getSubUnits()
      .then((response) => {
        this.setState({ subunits: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDataRKA = (rka, inputs) => {
    this.setState({ RKAs: rka, inputs: inputs });
  };

  render() {
    return (
      <Container fluid className="ml-4">
        <Row>
          <Col xs={3}>
            <InputUnitADO data={this.state} sendDataRKA={this.getDataRKA} />
          </Col>
          <Col xs={8}>
            <RincianRKAPengeluaran
              RKAs={this.state.RKAs}
              inputs={this.state.inputs}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
