import React, { Component } from 'react';
import '../styles/login-form.css'
import LoginHandler from '../networking/LoginHandler';
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.handler = new LoginHandler();
        this.login = this.login.bind(this);
        this.isEmpty = this.isEmpty.bind(this);

        this.state = {
            username: null,
            password: null,
            redirect: false,
            user: null
        }
    }

    isEmpty(field) {
        return field == null || field === '';
    }

    login() {
        if (this.isEmpty(this.state.username) || this.isEmpty(this.state.password)) {
            return;
        }
        const request = {
            'username': this.state.username,
            'password': this.state.password
        };
        this.handler.login(request).then(result => {
            if (result != null) {
                this.setState({redirect: true, user: result});
            }
        });
    }

    render() {
        return this.state.redirect ?
            <Redirect to={{ pathname: '/', state: { user: this.state.user } }} /> :
            (
                <div className='login-form-container'>
                    <div className='login-form'>
                        <input type='text' required placeholder='Username' onChange={e => this.setState({ username: e.target.value })} />
                        <input type='password' required placeholder='Password' onChange={e => this.setState({ password: e.target.value })} />
                        <button onClick={this.login} >Log In</button>
                    </div>
                </div>
            );
    }
}

export default LoginForm;