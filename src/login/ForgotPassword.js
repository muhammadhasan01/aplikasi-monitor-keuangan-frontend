import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Card, Form, Button } from 'react-bootstrap';
import {AuthDataService} from "../_services/auth-service";

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.refUsername = React.createRef();
		this.state = { feedbackMessage: null }
	}

	handleSubmit = () => {
		const { current: { value }} = this.refUsername;
		const body = { username: value };
		AuthDataService.sendResetLink(body)
			.then(resp => {
				console.log(resp.data);
				this.setState({ feedbackMessage: { status: "success", message: "Email sent successfully!"} })
			})
			.catch(err => {
				console.log(err);
				this.setState({ feedbackMessage: { status: "danger", message: "Something went wrong" } });
			})
	}

	render() {
		const { feedbackMessage } = this.state;
		return (
			<Container className='d-flex justify-content-center align-items-center'>
				<Card className='mt-5 text-center' style={{ width:'60%' }}>
					<Card.Header as='h5'>Forgot Password</Card.Header>
					<Card.Body>
						<Form>
							<Form.Group controlId='username-form'>
								Lost your password? Please enter your username. <br />
								You will receive a link to create a new password via registered email.
								<Form.Control required type='text' placeholder='Enter your username' ref={this.refUsername}/>
							</Form.Group>
							<Button onClick={this.handleSubmit}>
								Submit
							</Button>
						</Form>
						{feedbackMessage && <Alert variant={feedbackMessage.status} className='m-2'>
							{feedbackMessage.message}
						</Alert>}
					</Card.Body>
					<Card.Footer><Link to='login'>Back to login page</Link></Card.Footer>
				</Card>
			</Container>
		);
	}
}