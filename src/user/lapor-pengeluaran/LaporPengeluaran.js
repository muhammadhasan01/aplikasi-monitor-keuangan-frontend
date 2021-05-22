import React, { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { HiOutlineDocumentDownload } from "react-icons/hi";

export class LaporPengeluaran extends Component {
  render() {
    return (
      <Container
        fluid
        className="ml-1 mt-4 text-center align-items-center justify-content-center d-flex flex-column"
      >
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>
              <h4>Lapor Pengeluaran</h4>
            </Card.Title>
            <Card.Text>
              Untuk melakukan laporan pengeluaran, Anda dapat mengikuti panduan
              lengkap pada dokumen laporan pengeluaran.
            </Card.Text>
            <Button
              variant="success"
              className="d-flex w-100 justify-content-center align-items-center"
              target="_blank"
              href="https://drive.google.com/file/d/1L7786LGBhLBpGyTm-dKvpR4UCOazVn98/view?usp=sharing"
            >
              Download Dokumen
              <HiOutlineDocumentDownload className="ml-1" />
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
