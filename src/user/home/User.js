import React, { Component } from "react";
import { Container } from "react-bootstrap";
import HomeSVG from "./images/home-svg";

export class User extends Component {
  render() {
    return (
      <Container className="d-flex row justify-content-center align-items-center">
        <div className="mt-3 mr-5">
          <HomeSVG scale={0.7} />
        </div>
        <h3>Selamat Datang di Aplikasi Monitor Keuangan!</h3>
      </Container>
    );
  }
}
