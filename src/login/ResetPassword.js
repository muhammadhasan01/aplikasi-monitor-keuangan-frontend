import React, { Component } from 'react';
import { authenticationService } from "_services";

class ResetPassword	 extends Component {
	constructor(props) {
		super(props);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.state = {
			invalid: false,
			msg : null
		};
	}

	async onSubmitForm(e) {
		e.preventDefault();
		const {newPassword, newPasswordConfirmation } = e.target;
		const data = {
            username: props.match.params.username,
			newPassword: newPassword,
			newPasswordConfirmation : newPasswordConfirmation
        };
		authenticationService.ResetPassword(data)
		.then(
			() => {
				this.props.history.push('/');
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
						<input type="password" name="newPassword" placeholder="PASSWORD" required /> <br />
						<input type="password" name="newPasswordConfirmation" placeholder="PASSWORD" required /> <br />
						<button type="submit" className="login-btn">
							RESET
						</button>
						<br />
							{this.state.msg}
					</form>
				</div>
			</div>
		);
	}
}

export default ResetPassword;
