import React, { Component } from 'react';
import axios from "axios";

const server = process.env.REACT_APP_API_SERVER;

class FormLogin extends Component {
	constructor(props) {
		super(props);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.state = {
			invalid: false
		};
	}

	async onSubmitForm(e) {
		e.preventDefault();
		const { username, password } = e.target;
		const req = { username: username.value, password: password.value };
		const res = axios.post(`${server}/auths/login`, req)
			.then(res => {
				// TODO: Redirect to Home Page
				console.log("success", res);
				return res.data;
			})
			.catch(err => {
				this.setState({
						invalid: true
					});
				});
	}

	render() {
		return (
			<div className="form-login-container">
				<form onSubmit={this.onSubmitForm}>
					<input type="text" name="username" placeholder="USERNAME" required /> <br />
					<input type="password" name="password" placeholder="PASSWORD" required /> <br />
					<button type="submit" class="login-btn">
						LOGIN
					</button>
					<br />
					<a class="password" href="www.google.com">
						Forgot Password?
					</a>
					{this.state.invalid ? <div style={{color: 'red'}}>
						Invalid username/password.
					</div> : null}
				</form>

			</div>
		);
	}
}

export default FormLogin;
