import React, { Component } from 'react';
import Header from '_components/Header';
import { authenticationService } from "_services";

class FormLogin extends Component {
	constructor(props) {
		super(props);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.state = {
			invalid: false
		};

		// redirect to home if already logged in
		if (authenticationService.currentUserValue) {
			this.props.history.push('/');
		}
	}

	async onSubmitForm(e) {
		e.preventDefault();
		const { username, password } = e.target;
		authenticationService.login(username.value, password.value)
			.then(
				user => {
					console.log(user);
					const { from } = this.props.location.state || { from: { pathname: "/" } };
					this.props.history.push(from);
				},
				error => {
					console.log(error);
					this.setState({ invalid: true })
				}
			);
	}

	render() {
		return (
			<div>
				<div className="form-login-container">
					<form onSubmit={this.onSubmitForm}>
						<input type="text" name="username" placeholder="USERNAME" required /> <br />
						<input type="password" name="password" placeholder="PASSWORD" required /> <br />
						<button type="submit" className="login-btn">
							LOGIN
						</button>
						<br />
						{this.state.invalid ? <div style={{color: 'red'}}>
							Invalid username/password.
						</div> : null}
					</form>

				</div>
			</div>
		);
	}
}

export default FormLogin;
