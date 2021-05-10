import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { authenticationService } from "_services";

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	async onSubmitForm(e) {
		e.preventDefault();
		const {username} = e.target;
		authenticationService.sendResetLink(username.value).then(() => {
            this.props.history.push("/");
        });
	}

	render() {
		return (
			<Container className='d-flex justify-content-center align-items-center'>
				<Card className='mt-5 text-center' style={{ width:'60%' }}>
					<Card.Header as='h5'>Forgot Password</Card.Header>
					<Card.Body>
						<Form>
							<Form.Group controlId='username-form'>
								Lost your password? Please enter your username. <br />
								You will receive a link to create a new password via registered email.
								<Form.Control type='text' placeholder='Enter your username'/>
							</Form.Group>
							<Button type="submit">
								Submit
							</Button>
						</Form>
					</Card.Body>
					<Card.Footer><Link to='login'>Back to login page</Link></Card.Footer>
				</Card>
			</Container>
		);
	}
}