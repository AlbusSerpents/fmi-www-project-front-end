import React, { Component } from 'react';
import '../../styles/admin-home.css'
import { Redirect } from 'react-router-dom'

import LoginForm from '../LoginForm';

class AdminLogin extends Component {

    constructor(props) {
        super(props);

        this.authenticated = this.authenticated.bind(this);

        this.state = {
            user: null
        };
    }

    authenticated(result) {
        this.setState({ user: result });
    }

    render() {
        return this.state.user !== null ?
            <Redirect to={{ pathname: '/', state: { user: this.state.user } }} /> :
            (
                <div>
                    <div id='admin-home'>
                        <div className='form-container'>
                            <LoginForm onSuccess={this.authenticated} role='a' />
                        </div>
                    </div>
                </div>
            )
    }
}

export default AdminLogin;