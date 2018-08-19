import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../../styles/domains.css';

import NavBar from './../NavBar'
import DomainSearch from '../common/DomainSearch'
import MyDomains from './MyDomains'

class Domains extends Component {

    render() {
        return this.props.user === undefined ? <Redirect to='/' /> : (
            <div className='domains'>
                <NavBar user={this.props.user} />
                <div className='content'>
                    <div className='domains-search'>
                        <DomainSearch sessionId={this.props.user.sessionId} />
                    </div>
                    <div className='my-domains'>
                        <MyDomains sessionId={this.props.user.sessionId} userId={this.props.user.id} />
                    </div>
                </div>
            </div >
        );
    }

}

export default Domains;