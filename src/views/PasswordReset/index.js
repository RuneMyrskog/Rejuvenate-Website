import React from "react";
import "./styles.css";
import loginConstant from "./../../constants/login/login_constants.js";

import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

// TODO: Convert this to a functional component.
export default class PasswordReset extends React.Component {
	// I found this helpful:
	// - https://reactjs.org/docs/forms.html
	// - https://material-ui.com/components/text-fields/
	// - https://material-ui.com/components/buttons/#text-buttons
	// - https://material-ui.com/api/form-control/

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
	}

	updateUsername = (e) => {
		e.preventDefault();
		this.setState({ username: e.target.value });
	}

	updatePassword = (e) => {
		e.preventDefault();
		this.setState({ password: e.target.value });
	}

	// TODO: In phase 2, we plan on verifying user credentials against a database.
	usernameExists(username) {
		return this.state.username !== loginConstant.CORRECT_REGULAR_USER_USERNAME;
	}

	// TODO: In phase 2, we plan on verifying admin credentials against a database.
	adminUsernameExists(username) {
		return this.state.username !== loginConstant.CORRECT_ADMIN_USERNAME;
	}

	// TODO: In phase 2, we plan on verifying user credentials against a database.
	userPasswordIsStrong() {
		return this.state.password !== loginConstant.CORRECT_REGULAR_USER_PASSWORD;
	}

	// TODO: In phase 2, we plan on verifying admin credentials against a database.
	adminPasswordIsStrong() {
		return this.state.password !== loginConstant.CORRECT_ADMIN_PASSWORD;
	}

	logIn() {
		if (this.usernameExists() && this.userPasswordIsStrong()) {
			return "/home";
		} else if (this.adminUsernameExists() && this.adminPasswordIsStrong()) {
			return "/admin home";
		} else {
			return "/password reset";
		}
	}

	render() {
		return (
			<div id="passwordResetContainer">
				<h1 id="title">Rejuvenate</h1>
				<div id="passwordResetComponent">
					<FormControl>
						<TextField
							id="usernameTextbox"
							value={this.state.username}
							onChange={this.updateUsername}
							label="Existing Username"
							// error={!this.state.username}
							// helperText={NONEXISTING_USERNAME_ERROR_MSG}
						/>
						<TextField
							id="passwordTextbox"
							value={this.state.password}
							onChange={this.updatePassword}
							label="New Password"
							type="password"
							// error={!this.state.password}
							// helperText={WEAK_PASSWORD_ERROR_MSG}
						/>
						<br></br>
						<Button
							className="resetPasswordButton"
							href={this.logIn()}
							variant="contained"
							disabled={this.state.username === '' || this.state.password === ''}
							disableElevation
						>
							Reset Password
						</Button>
						<Button
							className="resetPasswordButton"
							href="/login"
							variant="contained"
							disableElevation
						>
							Go Back
						</Button>
					</FormControl>
				</div>
			</div>
		);
	}
}
