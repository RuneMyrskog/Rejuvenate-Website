import React from 'react';
import './styles.css';

export default class Form extends React.Component {
    // I found this helpful: https://reactjs.org/docs/forms.html
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessages: {
                missingUsername: "Username is missing.",
                missingPassword: "Password is missing.",
                incorrectUsername: "Username is incorrect.",
                incorrectPassword: "Password is incorrect.",
                nonexistingUsername: "New username does not exist.",
                existingUsername: "New username already exists.",
                weakPassword: "New password is not strong enough.",
                strongPasswordForPasswordReset: "This existing username has a strong enough password.",
                strongPasswordForRegistration: "This new username has a strong enough password.",
                correctCredentials: "Username and password are correct."
            }
        };
    }

    render() {
        return (
            <form onSubmit={this.processCredentials} action={this.processCredentials() ?
                this.props.successfulLoginLink : this.props.failureLoginLink} >
                <div>
                    <label>
                        {this.props.label1}: <input type="text" name="username"
                            value={this.props.username} onChange={this.updateUsername} />
                    </label>
                </div>
                <div>
                    <label>
                        {this.props.label2}: <input type="text" name="password"
                            value={this.props.password} onChange={this.updatePassword} />
                    </label>
                </div>
                { this.displayError() }
                <input type="submit" value={this.props.submitButtonName} />
            </form>
        );
    }

    updateUsername = (e) => {
        e.preventDefault();
        this.setState({ username: e.target.value });
    }

    updatePassword = (e) => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    // This is an abstract class.
    processCredentials() { }

    // This is an abstract class.
    displayError() { }
}