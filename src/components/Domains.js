import React, { Component } from 'react';
import '../styles/domains.css';
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from "react-cookie";

import DomainSearch from './DomainSearch'
import DomainInfoBuble from './DomainInfoBuble'

import DomainsHandler from '../networking/DomainsHandler'

class Domains extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.handleUser = this.handleUser.bind(this);
        this.myDomains = this.myDomains.bind(this);

        this.searchIp = this.searchIp.bind(this);
        this.searchDomain = this.searchDomain.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.drawSearch = this.drawSearch.bind(this);

        this.state = {
            user: null,
            authenticated: false,
            searchResult: null,
            hasResults: false,
            searchTriggered: false
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

    handleUser() {
        if (!this.state.authenticated) {
            return <Redirect to='/' />
        }
    }

    myDomains() {
        const userId = this.state.user.id;
        this.handler.getMyDomains(userId)
            .then(domains => console.log(domains));
    }

    searchIp(ip) {
        const promise = this.handler.searchDomain(ip, null)
        this.handleSearch(promise);
    }

    searchDomain(domain) {
        const promise = this.handler.searchDomain(null, domain)
        this.handleSearch(promise);

    }

    handleSearch(promise) {
        promise
            .then(found => {
                this.setState({ searchTriggered: true });
                found != null ?
                    this.setState({ searchResult: found, hasResults: true }) :
                    this.setState({ hasResults: false });
            });
    }

    drawSearch() {
        if (this.state.searchTriggered) {
            return <DomainInfoBuble result={this.state.searchResult} className='domain-search-result' hasResults={this.state.hasResults} />
        } else {
            return;
        }
    }

    render() {
        return (
            <div className='domains'>
                {this.handleUser()}
                <NavBar />
                <div className='content'>
                    <DomainSearch searchIp={this.searchIp} searchDomain={this.searchDomain} className='domains-search-bar' clearFunction={() => this.setState({ searchTriggered: false })} />
                    {this.drawSearch()}
                    <div className='domains-splitting-line'>
                        <hr />
                    </div>
                    Currently owned domains
                    {this.myDomains()}
                    <div className='my-domains'>
                    </div>
                </div>
            </div>
        );
    }

}

export default withCookies(Domains);