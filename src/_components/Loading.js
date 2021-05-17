import React, { Component } from "react";
import { Container } from "react-bootstrap";

export class Loading extends Component {
  render() {
    const { info } = this.props;
    return (
      <Container className="row d-flex justify-content-center">
        <h3 className="mx-5 pt-4">Loading data {info}...</h3>
        <div className="loader" />
      </Container>
    );
  }
}
