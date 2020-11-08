import React from 'react';
import './styles.css';
import UserForm from '../UserForm';

import { CORRECT_REGULAR_USER_USERNAME, CORRECT_REGULAR_USER_PASSWORD } from "../UserForm";
import {
    MISSING_USERNAME_ERROR_MSG, MISSING_PASSWORD_ERROR_MSG,
    EXISTING_USERNAME_ERROR_MSG, WEAK_PASSWORD_ERROR_MSG,
    STRONG_PASSWORD_FOR_REGISTRATION_MSG
} from '../Form';

export default class UserRegisterForm extends UserForm {
    displayError() {
        if (this.state.username === '') {
            return <p>{MISSING_USERNAME_ERROR_MSG}</p>;
        } else if (this.state.password === '') {
            return <p>{MISSING_PASSWORD_ERROR_MSG}</p>;
        } else if (this.state.username !== CORRECT_REGULAR_USER_USERNAME) {
            return <p>{EXISTING_USERNAME_ERROR_MSG}</p>;
        } else if (this.state.password !== CORRECT_REGULAR_USER_PASSWORD) {
            return <p>{WEAK_PASSWORD_ERROR_MSG}</p>;
        } else {
            return <p>{STRONG_PASSWORD_FOR_REGISTRATION_MSG}</p>;
        }
    }
}