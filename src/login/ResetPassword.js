import React, { Component } from 'react';
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { getUserFromToken } from "_helpers";
import { AuthDataService, authenticationService } from "_services";
import { Link } from "react-router-dom";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/all";
import * as yup from 'yup';

export class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feedback: null
		}
		// redirect to home if already logged in
		if (authenticationService.currentUserValue) {
			this.props.history.push('/');
		}
	}

	onSubmitForm = ({ password, confirmPassword }) => {
		const {token} = this.props.match.params;
		const {username} = getUserFromToken(token);
		const body = { username, newPassword: password, newPasswordConfirmation: confirmPassword }
		AuthDataService.resetPassword(body)
			.then(() => {
				const feedback = {
					status: "success",
					message: "Password berhasil dilakukan reset!"
				}
				this.setState({ feedback })
			})
			.catch((err) => {
				console.log(err);
				const feedback = {
					status: "danger",
					message: "Terjadi kesalahan..."
				}
				this.setState({ feedback })
			})
	}

	render() {
		const { token } = this.props.match.params;
		const user = getUserFromToken(token);
		if (!user) {
			return <Alert variant='danger' className='p-3 text-center'>Error 404 Not Found</Alert>
		}
		const { feedback } = this.state;
		return (
			<Container className='d-flex justify-content-center align-items-center'>
				<Card className='mt-5 text-center' style={{ width:'45%' }}>
					<Card.Header as='h5'>Reset Kata Sandi User: <b>{user.username}</b></Card.Header>
					<Card.Body>
						<Formik
							validationSchema={yup.object().shape({
								password: yup.string()
									.min(5, "Kata sandi harus memiliki minimal 5 karakter")
									.required("Kata sandi baru dibutuhkan"),
								confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Kata sandi harus sama")
							})}
							initialValues={{ password: '', confirmPassword: '' }}
							onSubmit={(values) => this.onSubmitForm(values)}
						>
							{({
								  handleSubmit,
								  handleChange,
								  values,
								  errors
							  }) => (
								<Form noValidate onSubmit={handleSubmit}>
									<Form.Group controlId='password-form'>
										<Form.Label className='d-flex justify-content-center align-items-center'>
											<RiLockPasswordLine className='mr-1'/> Kata Sandi Baru</Form.Label>
										<Form.Control required
													  type="password"
													  name="password"
													  placeholder="Masukkan Kata Sandi Baru"
													  value={values.password}
													  onChange={handleChange}
													  isValid={!!errors.password}
										/>
										<Form.Control.Feedback style={{ color: "rgb(255,0,0)" }}>
											{errors.password}
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId='password-confirm-form'>
										<Form.Label className='d-flex justify-content-center align-items-center'>
											<RiLockPasswordFill className='mr-1'/> Konfirmasi Kata Sandi</Form.Label>
										<Form.Control required
													  type="password"
													  name="confirmPassword"
													  placeholder="Masukkan Konfirmasi Kata Sandi"
													  value={values.confirmPassword}
													  onChange={handleChange}
													  isValid={!!errors.confirmPassword}
										/>
										<Form.Control.Feedback style={{ color: "rgb(255,0,0)" }}>
											{errors.confirmPassword}
										</Form.Control.Feedback>
									</Form.Group>
									<Button type='submit' variant="info" disabled={!!feedback && feedback.status === "success"}>
										Submit
									</Button>
									{feedback !== null &&
									<Alert className='mt-3' variant={feedback.status}>{feedback.message}</Alert>}
								</Form>
							)}
						</Formik>
					</Card.Body>
					<Card.Footer>
						{!!feedback
						&& <Link to='/login' exact className='text-black-50'>Kembali ke halaman login</Link>}
					</Card.Footer>
				</Card>
			</Container>
		)
	}
}