import './styles.css';
import Form from '../Form';

export default class UserForm extends Form {
    processCredentials() {
        return this.state.username !== '' &&
            this.state.password !== '' &&
            this.state.username === CORRECT_REGULAR_USER_USERNAME &&
            this.state.password === CORRECT_REGULAR_USER_PASSWORD;
    }
}

export const CORRECT_REGULAR_USER_USERNAME = "user";
export const CORRECT_REGULAR_USER_PASSWORD = "user";