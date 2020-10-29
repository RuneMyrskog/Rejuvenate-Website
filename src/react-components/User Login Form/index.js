import React from 'react';
import './styles.css';
import UserForm from '../User Form';

const CORRECT_REGULAR_USER_USERNAME = "user";
const CORRECT_REGULAR_USER_PASSWORD = "user";

export default class UserLoginForm extends UserForm {
    displayError() {
        if (this.state.username === '') {
            return <p>{this.state.errorMessages.missingUsername}</p>;
        } else if (this.state.password === '') {
            return <p>{this.state.errorMessages.missingPassword}</p>;
        } else if (this.state.username !== CORRECT_REGULAR_USER_USERNAME) {
            return <p>{this.state.errorMessages.incorrectUsername}</p>;
        } else if (this.state.password !== CORRECT_REGULAR_USER_PASSWORD) {
            return <p>{this.state.errorMessages.incorrectPassword}</p>;
        } else {
            return <p>{this.state.errorMessages.correctCredentials}</p>;
        }
    }
}