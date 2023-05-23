import React from "react";

import loginConstant from "./../../constants/login/login_constants.js";

import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import "./styles.css";

import { DumbellIcon } from "../../react-components/Icons";

// TODO: Convert this to a functional component.
export default class Login extends React.Component {
	// I found this helpful:
	// - https://reactjs.org/docs/forms.html
	// - https://material-ui.com/components/text-fields/
	// - https://material-ui.com/components/buttons/#text-buttons
	// - https://material-ui.com/api/form-control/

	constructor(props) {
		super(props);
		// TODO: Use React hooks and useState instead.
		this.state = {
			username: "",
			password: "",
			lastActionWasLoginAttempt: false
		};
	}

	updateUsername = (e) => {
		e.preventDefault();
		this.setState({ username: e.target.value, lastActionWasLoginAttempt: false });
	}

	updatePassword = (e) => {
		e.preventDefault();
		this.setState({ password: e.target.value, lastActionWasLoginAttempt: false  });
	}

	logIn = () => {
		fetch(`/api/login`, {
			method: 'post',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			}),
		}).then(response => {
			if (response.status === 200) {
				this.props.history.push('/home'); // go to user home
			} else {
				// login attempt has failed, handle notifying user somehow
				console.log("login attempt failed"); // do whatever here
				this.setState({lastActionWasLoginAttempt: true});
			}
		});
	}

	helperText() {
		if (this.state.lastActionWasLoginAttempt) {
			return loginConstant.INCORRECT_CREDENTIAL_MSG;
		} else {
			return "";
		}
	}

	render() {
		return (
			<div id="loginScreenBackground">
			<div id="loginContainer">
				<h1 id="title">Rejuvenate</h1>
				<div className="container-spaced">
					<DumbellIcon id="left-dumbell-icon" className="orange-icon"/>

					<div className="loginComponent">
						<FormControl>
							<TextField
								id="usernameTextbox"
								value={this.state.username}
								onChange={this.updateUsername}
								label="Username"
								error={this.helperText.call(this) !== ""}
							/>
							<TextField
								id="passwordTextbox"
								value={this.state.password}
								onChange={this.updatePassword}
								label="Password"
								type="password"
								error={this.helperText.call(this) !== ""}
								helperText={this.helperText.call(this)}
							/>
							<br></br>
							<Button
								className="loginButton"
								onClick={this.logIn}
								variant="contained"
								disabled={!this.state.username
									|| !this.state.password}
							>
								Log In
							</Button>
							<Button
								className="loginButton"
								href="/register"
								variant="contained"
								
							>
								Sign Up
							</Button>
							{/* <Button
								className="loginButton"
								href="/password reset"
								variant="contained"
								
							>
								Reset Password
							</Button> */}
						</FormControl>
						
					</div>
						<DumbellIcon id="right-dumbell-icon" className="orange-icon" />
				</div>

				<p id="loginAsUserGreeting">This is a project website developed with the MERN stack, you can try it out by logging in with "user" as the username and password, or signing up!</p>
			</div>
		</div>
		);
	}
}
