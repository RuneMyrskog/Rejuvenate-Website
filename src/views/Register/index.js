import React from "react";
import "./styles.css";
import loginConstant from "./../../constants/login/login_constants.js";

import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { DumbellIcon } from "../../react-components/Icons";

// TODO: Convert this to a functional component.
export default class Register extends React.Component {
	// I found this helpful:
	// - https://reactjs.org/docs/forms.html
	// - https://material-ui.com/components/text-fields/
	// - https://material-ui.com/components/buttons/#text-buttons
	// - https://material-ui.com/api/form-control/

	constructor(props) {
		super(props);
		// TODO: Use React hooks and useState instead.
		this.state = {
			firstname: "",
			lastname: "",
			username: "",
			password: "",
			usernameTaken: null,
			successfulRegister: null
		};
	}

	updateFirstName = (e) => {
		e.preventDefault();
		this.setState({firstname: e.target.value})
	}

	updateLastName = (e) => {
		e.preventDefault();
		this.setState({lastname: e.target.value})
	}

	updateUsername = (e) => {
		e.preventDefault();
		this.setState({ username: e.target.value });
	}

	updatePassword = (e) => {
		e.preventDefault();
		this.setState({ password: e.target.value });
	}

	register = () => {
		fetch(`/api/users/check/${this.state.username}`)
			.then(res => res.json())
			.then(json => {
				this.setState({usernameTaken: json.usernameTaken})
				if (!this.state.usernameTaken){
					fetch(`/api/users`, {
						method: 'post',
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							firstname: this.state.firstname,
							lastname: this.state.lastname,
							username: this.state.username,
							password: this.state.password,
						})
					})
					.then(res => {
						if (res.status === 200) {
							this.setState({successfulRegister: true})
						} else {
							console.log("register attempt failed")
							this.setState({successfulRegister: false})
						}
					});
				} else {
					this.setState({successfulRegister: false})
				}
			});
	}

	displayMessage() {
		if (this.state.successfulRegister) {
			return (
				<span id="successMessage">You have succesfully registered! Welcome!</span>
			)
		}
	}

	usernameTakenHelperText = () => {
		if (this.state.usernameTaken) {
			return loginConstant.EXISTING_USERNAME_ERROR_MSG;
		} else {
			return "";
		}
	}

	render() {
		console.log(this.state)
		return (
			<div id="registerContainer">
				<h1 id="title">Rejuvenate</h1>
				<div className="container-spaced">
					<DumbellIcon id="left-dumbell-icon" />

					<div className="loginComponent">
						<FormControl>
							<TextField
								id="firstnameTextbox"
								value={this.state.firstname}
								onChange={this.updateFirstName}
								label="First Name"
							/>
							<TextField
								id="lastnameTextbox"
								value={this.state.lastname}
								onChange={this.updateLastName}
								label="Last Name"
							/>
							<TextField
								id="usernameTextbox"
								value={this.state.username}
								onChange={this.updateUsername}
								label="Username"
								error={this.usernameTakenHelperText.call(this) !== ""}
							/>
							<TextField
								id="passwordTextbox"
								value={this.state.password}
								onChange={this.updatePassword}
								label="Password"
								type="password"
								error={this.usernameTakenHelperText.call(this) !== ""}
								helperText={this.usernameTakenHelperText.call(this)}
								// helperText={loginConstant.WEAK_PASSWORD_ERROR_MSG}
							/>
							<br></br>
							<Button
								className="registerButton"
								onClick = {this.register}
								variant="contained"
								disabled={!this.state.firstname
									|| !this.state.lastname
									|| !this.state.username
									|| !this.state.password}
								disableElevation
							>
								Register
							</Button>
							<Button
								className="registerButton"
								href='/login'
								variant="contained"
								disableElevation
							>
								Go Back
							</Button>
						</FormControl>
					</div>
					<DumbellIcon id="right-dumbell-icon" />
				</div>
				{this.displayMessage()}
			</div>
		);
	}
}
