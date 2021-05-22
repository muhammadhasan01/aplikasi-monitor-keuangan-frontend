import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authenticationService } from "_services";
import { Formik } from "formik";
import { configLoginFormik } from "./login-schema";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/all";
import { RiLockPasswordFill } from "react-icons/all";

export class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
    };

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  onSubmitForm = ({ username, password }) => {
    authenticationService.login(username, password).then(
      () => {
        this.props.history.push("/");
      },
      (error) => {
        console.log(error);
        this.setState({ invalid: true });
      }
    );
  };

  render() {
    const { invalid } = this.state;
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          className="mt-5 text-center"
          style={{ width: "45%" }}
          bg="primary"
          text="white"
        >
          <Card.Header as="h5">Login</Card.Header>
          <Card.Body style={{ backgroundColor: "rgb(12,131,234)" }}>
            <Formik
              validationSchema={configLoginFormik.getSchema()}
              initialValues={configLoginFormik.getInitialValues()}
              onSubmit={(values) => this.onSubmitForm(values)}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="username-form">
                    <Form.Label className="d-flex justify-content-center align-items-center">
                      <AiOutlineUser className="mr-1" /> Username
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="username"
                      placeholder="Masukkan Username"
                      value={values.username}
                      onChange={handleChange}
                      isValid={!!errors.username}
                    />
                    <Form.Control.Feedback style={{ color: "rgb(255,0,0)" }}>
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="password-form">
                    <Form.Label className="d-flex justify-content-center align-items-center">
                      <RiLockPasswordFill className="mr-1" /> Kata Sandi
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      placeholder="Masukkan Kata Sandi"
                      value={values.password}
                      onChange={handleChange}
                      isValid={!!errors.password}
                    />
                  </Form.Group>
                  <Button type="submit" variant="info">
                    Login
                  </Button>
                  <Alert show={invalid} variant="danger" className="m-3">
                    username/kata sandi tidak valid
                  </Alert>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <Card.Footer>
            <Link to="/forgot-password" className="text-white">
              Lupa kata sandi?
            </Link>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}
