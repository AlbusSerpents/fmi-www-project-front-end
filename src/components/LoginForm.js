import React, { Component } from 'react';
import '../styles/login-form.css'
import NetworkingHandler from '../networking/NetworkHandler';
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from "react-cookie";

class LoginForm extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.networking = new NetworkingHandler();
        this.login = this.login.bind(this);
        this.username = this.username.bind(this);
        this.password = this.password.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.authenticate = this.authenticate.bind(this);

        this.state = {
            username: null,
            password: null,
            authenticated: false
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
            'roleToken': 'a',
            'username': this.state.username,
            'password': this.state.password
        };
        const { cookies } = this.props;

        this.networking.login(request, this.setUser).then(result => {
            this.setState({ authenticated: true });
            cookies.set('user', result, { path: '/' });
        });
    }

    username(event) {
        const username = event.target.value;
        this.setState({ username });
    }

    password(event) {
        const password = event.target.value;
        this.setState({ password })
    }

    authenticate() {
        if (this.state.authenticated) {
            return <Redirect to='/home' />
        }
    }

    render() {
        return (
            <div className='login-form-container'>
                {this.authenticate()}
                <div className='login-form'>
                    <input type='text' required placeholder='Username' onChange={this.username} />
                    <input type='password' required placeholder='Password' onChange={this.password} />
                    <button onClick={this.login} >Log In</button>
                </div>
            </div>
        );
    }
}

export default withCookies(LoginForm);