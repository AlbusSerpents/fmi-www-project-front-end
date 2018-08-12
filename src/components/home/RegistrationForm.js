import React, { Component } from 'react';
import '../../styles/home.css'

import AuthenticationService from '../../logic/auth/AuthenticationService';

class ReigstrationForm extends Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.service = new AuthenticationService();

        this.state = {
            username: null,
            password: null,
            name: null,
            facultyNumber: null,
            email: null,
            user: null
        }
    }

    register() {
        const request = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            email: this.state.email,
            facultyNumber: this.state.facultyNumber,
        };

        this.service
            .register(request)
            .then(result => this.props.onSuccess(result))
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div id='registration' className='form'>
                <input type='text' required placeholder='Username' onChange={e => this.setState({ username: e.target.value })} />
                <input type='password' required placeholder='Password' onChange={e => this.setState({ password: e.target.value })} />
                <input type='text' required placeholder='Name' onChange={e => this.setState({ name: e.target.value })} />
                <input type='number' min='10000' max='99999' required placeholder='Faculty Number' onChange={e => this.setState({ facultyNumber: e.target.value })} />
                <input type='text' required placeholder='Email' onChange={e => this.setState({ email: e.target.value })} />
                <button onClick={this.register} >Register</button>
            </div>
        );
    }
}

export default ReigstrationForm;