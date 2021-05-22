import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Container,
  Card,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { authenticationService, AuthDataService } from "_services";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.refUsername = React.createRef();
    this.state = { inp: "", feedbackMessage: null };

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const { inp: value } = this.state;
    const body = { username: value };
    this.setState({ status: "info", message: "Loading..." });
    AuthDataService.sendResetLink(body)
      .then((resp) => {
        console.log(resp);
        this.setState({
          feedbackMessage: {
            status: "success",
            message: "Email berhasil terkirim!",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          feedbackMessage: { status: "danger", message: "Terjadi kesalahan" },
        });
      });
  };

  render() {
    const { feedbackMessage, inp } = this.state;
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          className="mt-5 text-center"
          style={{ width: "45%" }}
          bg="info"
          text="white"
        >
          <Card.Header as="h5">Lupa Kata Sandi</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="username-form">
                Masukkan <b>username</b> Anda!
                <br />
                Anda akan mendapatkan <b>email</b> untuk melakukan pengubahan
                kata sandi.
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your username"
                  value={inp}
                  onChange={({ target: { value } }) =>
                    this.setState({ inp: value })
                  }
                />
              </Form.Group>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
            {feedbackMessage && (
              <Alert variant={feedbackMessage.status} className="m-2">
                {feedbackMessage.message}
              </Alert>
            )}
          </Card.Body>
          <Card.Footer>
            <Link to="/login" className="text-white">
              Kembali ke halaman login
            </Link>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}
