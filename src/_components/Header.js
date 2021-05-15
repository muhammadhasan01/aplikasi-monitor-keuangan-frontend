import React, { Component } from "react";
import { Image } from "react-bootstrap";

export class Header extends Component {
  showUserInfo(userInfo) {
    const { name, type, unit, subunit } = userInfo;
    return (
      <div style={{ textAlign: "right" }}>
        {name} <br />
        {type === "Admin" ? "Administrator" : unit + " - " + subunit}
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <Image src="https://avatars.githubusercontent.com/u/8663791?s=280&v=4" />
        <h1>Sistem Monitoring Anggaran</h1>
        Sekolah Teknik Elektro dan Informatika <br />
        Institut Teknologi Bandung <br />
        {this.props.userInfo ? this.showUserInfo(this.props.userInfo) : null}
      </div>
    );
  }
}