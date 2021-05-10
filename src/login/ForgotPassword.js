import React, { Component } from 'react';
import { authenticationService } from "_services";

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	async onSubmitForm(e) {
		e.preventDefault();
		const {username} = e.target;
		authenticationService.sendResetLink(username.value).then(() => {
            props.history.push("/");
        });
	}

	render() {
		return (
			<div>
				<div className="form-login-container">
					<form onSubmit={this.onSubmitForm}>
						<div>
						Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
						</div>
						<input type="text" name="username" placeholder="USERNAME" required /> <br />
						<button type="submit" className="login-btn">
							Send Email
						</button>
						<br />
						{this.state.invalid ? <div style={{color: 'red'}}>
							Invalid username.
						</div> : null}
					</form>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;