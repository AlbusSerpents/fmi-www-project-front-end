import React, { Component } from 'react';
import '../styles/domains.css';
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from "react-cookie";

import DomainsHandler from '../networking/DomainsHandler'

class Domains extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.handleUser = this.handleUser.bind(this);
        this.myDomains = this.myDomains.bind(this);

        this.handler = new DomainsHandler();

        this.state = { user: null };
    }

    componentWillMount() {
        const { cookies } = this.props;
        const userCookie = cookies.get('user');
        if (userCookie) {
            this.setState({ user: userCookie });
        } else {
            this.setState({ authenticated: true });
        }
    }

    handleUser() {
        if (this.state.user != null) {
            return <h2> Hello, {this.state.user.username} </h2>;
        } else {
            return <Redirect to='/' />
        }
    }

    myDomains() {
        if (this.state.user != null) {
            const auth = this.state.user.sessionId;
            const userId = this.state.user.id;
            this.handler.getMyDomains(userId, auth)
                .then(domains => console.log(domains));
        }
    }

    render() {
        return (
            <div className='domains'>
                <NavBar />
                <div className='content'>
                    <div className='search-bar'>
                        <input type='text' className='search-bar-text' />
                        <div className='search-type'>
                            <div className='search-bar-radio'>
                                <input type='radio' name='type' value='Ip Addres' />Ip Address
                            </div>
                            <div className='search-bar-radio' >
                                <input type='radio' name='type' value='Domain' />Domain
                            </div>
                        </div>
                        <input type='button' value='Search' className='search-button' />
                    </div>
                    <div><hr /></div>
                    {this.myDomains()}
                    <div className='my-domains'>
                    </div>
                </div>
            </div>
        );
    }

}

export default withCookies(Domains);