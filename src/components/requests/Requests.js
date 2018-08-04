import React, { Component } from 'react';
import NavBar from './../NavBar'
import '../../styles/requests.css'
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from "react-cookie";

import RequestsForm from './RequestsForm'

class Requests extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            authenticated: false,
        };
    }

    componentWillMount() {
        const { cookies } = this.props;
        const userCookie = cookies.get('user');
        if (userCookie) {
            this.setState({ user: userCookie });
            this.setState({ authenticated: true });
        }
    }

    render() {
        return !this.state.authenticated ?
            <Redirect to='/' /> :
            (
                <div className='requests'>
                    <NavBar />
                    <div className='requests-form-position'>
                        <RequestsForm zoneName='.fmi.com' sessionId={this.state.user.sessionId} />
                    </div>
                </div >
            );
    }

}

export default withCookies(Requests);