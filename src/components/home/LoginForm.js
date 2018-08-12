import React, { Component } from 'react';
import '../../styles/home.css'

import AuthenticationService from '../../logic/auth/AuthenticationService';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.service = new AuthenticationService();

        this.state = {
            username: null,
            password: null,
        };
    }

    login() {
        this.service
            .login(this.state.username, this.state.password)
            .then(result => this.props.onSuccess(result))
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div id='login' className='form'>
                <input type='text' required placeholder='Username' onChange={e => this.setState({ username: e.target.value })} />
                <input type='password' required placeholder='Password' onChange={e => this.setState({ password: e.target.value })} />
                <button onClick={this.login} >Log In</button>
            </div>
        );
    }
}

export default LoginForm;