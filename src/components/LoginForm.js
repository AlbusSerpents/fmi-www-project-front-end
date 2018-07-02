import React, { Component } from 'react';
import '../styles/login-form.css'
import NetworkingHandler from '../networking/NetworkHandler';
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {

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
            'roleToken': 'a',
            'username': this.state.username,
            'password': this.state.password
        };
        const result = this.networking.login(request, this.setUser);
        if (result !== null) {
            this.setState({ user: result });
        }
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
        if (this.state.user !== null) {
            return <Redirect to={{
                pathname: '/home',
                redirect: { data: this.state.user }
            }} />
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

export default LoginForm;