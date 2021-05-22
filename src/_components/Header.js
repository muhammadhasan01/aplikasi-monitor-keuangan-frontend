import React, { Component } from "react";
import { Badge, Button, Col, Image, Row } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { authenticationService } from "_services";

export class Header extends Component {
  showUserInfo(userInfo) {
    const { name, type, unit, subunit } = userInfo;
    return (
      <div>
        {name} <br />
        {type === "Admin" ? "Administrator" : unit + " - " + subunit} <br />
        <Button
          size="sm"
          variant="info"
          className="mt-2"
          onClick={() => authenticationService.logout()}
        >
          Logout <FiLogOut />
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <Row>
          <Col>
            <Image src="https://avatars.githubusercontent.com/u/8663791?s=280&v=4" />
            <h1>
              <b>Sistem Monitoring Anggaran</b>{" "}
              <Badge variant="primary">v1</Badge>
            </h1>
            Sekolah Teknik Elektro dan Informatika <br />
            Institut Teknologi Bandung <br />
          </Col>
          <Col className="float-right text-right mt-3 mr-1">
            {this.props.userInfo
              ? this.showUserInfo(this.props.userInfo)
              : null}
          </Col>
        </Row>
      </div>
    );
  }
}
