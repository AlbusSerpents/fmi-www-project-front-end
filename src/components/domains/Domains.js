import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../../styles/domains.css';

import NavBar from './../NavBar'
import DomainSearch from './DomainSearch'
import MyDomains from './MyDomains'

class Domains extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            searchResult: null,
            hasResults: false,
            displaySearch: false,
            myDomains: null
        };
    }

    render() {
        return this.props.user === undefined ? <Redirect to='/' /> : (
            <div className='domains'>
                <NavBar user={this.props.user} />
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

export default Domains;