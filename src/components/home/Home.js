import React, { Component } from 'react';
import '../../styles/home.css'
import { Redirect } from 'react-router-dom'

import LoginForm from '../common/LoginForm';
import RegistrationForm from './RegistrationForm';

class Home extends Component {

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
                    <div id='home-page'>
                        <div className='form-container'>
                            <LoginForm onSuccess={this.authenticated} roleToken='c'/>
                        </div>
                        <div id='horizonal-split'></div>
                        <div className='form-container'>

                            <RegistrationForm onSuccess={this.authenticated} />
                        </div>
                    </div>
                </div>
            )
    }
}

export default Home;