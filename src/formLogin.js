import React, { Component } from 'react';

class FormLogin extends Component {
	render() {
		return (
			<div className="form-login-container">
				<form>
					<input type="email" name="username" placeholder="USERNAME" required /> <br />
					<input type="password" name="password" placeholder="PASSWORD" required /> <br />
					<button type="submit" class="login-btn">
						LOGIN
					</button>
					<br />
					<a class="password" href="www.google.com">
						Forgot Password?
					</a>
				</form>
			</div>
		);
	}
}

export default FormLogin;
