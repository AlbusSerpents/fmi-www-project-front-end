import React, { Component } from 'react';
import '../../styles/domains.css';
import NavBar from './../NavBar'
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from "react-cookie";

import DomainSearch from './DomainSearch'
import DomainInfoBuble from './DomainInfoBuble'

import DomainsHandler from '../../networking/DomainsHandler'

class Domains extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.handleMyDomains = this.handleMyDomains.bind(this);
        this.drawMyDomains = this.drawMyDomains.bind(this);

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
            this.handler = new DomainsHandler(userCookie.sessionId);
        }
    }

    handleMyDomains() {
        const userId = this.state.user.id;
        if (this.state.myDomains === null) {
            this.handler.getMyDomains(userId)
                .then(result => result === null ? [] : result)
                .then(myDomains => this.setState({ myDomains: myDomains }))
                .then(_ => this.drawMyDomains());
        }
    }

    drawMyDomains() {
        return (
            <div>
                {this.state.myDomains.map(domain =>
                    <DomainInfoBuble result={domain} className='domain-search-result' hasResults={true} />
                )}
            </div>
        );
    }


    render() {
        return !this.state.authenticated ?
            <Redirect to='/' />
            : (
                <div className='domains'>
                    <NavBar />
                    <div className='content'>
                        <DomainSearch sessionId={this.state.user.sessionId} />

                        <div className='domains-splitting-line'>
                            <hr />
                        </div>

                        Currently owned domains

                    {this.handleMyDomains()}

                        <div className='my-domains'>
                        </div>
                    </div>
                </div>
            );
    }

}

export default withCookies(Domains);