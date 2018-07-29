import React, { Component } from 'react';
import '../../styles/domains.css';
import NavBar from './../NavBar'
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from "react-cookie";

import DomainSearch from './DomainSearch'

import MyDomains from './MyDomains'

class Domains extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            authenticated: false,
            searchResult: null,
            hasResults: false,
            displaySearch: false,
            myDomains: null
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
                <div className='domains'>
                    <NavBar />
                    <div className='content'>
                        <div className='domains-search'>
                            <DomainSearch sessionId={this.state.user.sessionId} />
                        </div>
                        <div className='my-domains'>
                            <MyDomains sessionId={this.state.user.sessionId} userId={this.state.user.id} />
                        </div>
                    </div>
                </div >
            );
    }

}

export default withCookies(Domains);