import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineForm } from "react-icons/all";
import { FaMoneyBillWave } from "react-icons/fa";
import { VscOutput } from "react-icons/vsc";

export class Navigation extends Component {
  adminNavigation() {
    return (
      <nav>
        <Link
          className="nav d-flex justify-content-center align-items-center"
          to="/"
        >
          <AiFillHome className="mx-1" /> Home
        </Link>
        <Link className="nav" to="/pagu-anggaran">
          Pagu Anggaran
        </Link>
        <Link className="nav" to="/pengurusan-akun">
          Pengurusan Akun
        </Link>
        <Link className="nav" to="/riwayat-pengeluaran">
          Riwayat Pengeluaran & Form F11
        </Link>
        <Link className="nav" to="/input-pengeluaran">
          Input Pengeluaran
        </Link>
      </nav>
    );
  }

  userNavigation() {
    return (
      <nav>
        <Link
          className="nav d-flex justify-content-center align-items-center"
          to="/"
        >
          <AiFillHome className="mr-2" /> Home
        </Link>
        <Link
          className="nav d-flex justify-content-center align-items-center"
          to="/riwayat-keuangan"
        >
          <FaMoneyBillWave className="mr-2" /> Riwayat Keuangan
        </Link>
        <Link
          className="nav d-flex justify-content-center align-items-center"
          to="/lapor-pengeluaran"
        >
          <VscOutput className="mr-1" /> Lapor Pengeluaran
        </Link>
        <Link
          className="nav d-flex justify-content-center align-items-center"
          to="/pengisian-rka"
        >
          <AiOutlineForm className="mr-1" /> Pengisian RKA
        </Link>
      </nav>
    );
  }

  render() {
    const userInfo = this.props.userInfo;
    if (!userInfo) {
      return null;
    }
    const { type } = userInfo;
    return (
      <nav className="py-2">
        {type === "Admin" ? this.adminNavigation() : this.userNavigation()}
      </nav>
    );
  }
}
