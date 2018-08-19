import React, { Component } from 'react';
import '../../styles/admin-home.css'
import { Redirect } from 'react-router-dom'

import LoginForm from '../common/LoginForm';

class AdminLogin extends Component {

    constructor(props) {
        super(props);

        this.authenticated = this.authenticated.bind(this);

        this.state = {
            admin: null
        };
    }

    authenticated(result) {
        this.setState({ admin: result });
    }

    render() {
        return this.state.admin !== null ?
            <Redirect to={{ pathname: '/admin/home', state: { admin: this.state.admin } }} /> :
            (
                <div>
                    <div id='admin-home'>
                        <div className='admin-form-container'>
                            <LoginForm onSuccess={this.authenticated} roleToken='a' />
                        </div>
                    </div>
                </div>
            )
    }
}

export default AdminLogin;