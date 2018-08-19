import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../../styles/domains.css';

import AdminNavBar from './AdminNavBar'
import AdminRequests from './AdminRequests'
import DomainSearch from '../common/DomainSearch'

class AdminHome extends Component {

    render() {
        return this.props.admin === undefined ? <Redirect to='/' /> : (
            <div>
                <AdminNavBar admin={this.props.admin} />
                <div className='content'>
                    <div className='domains-search'>
                        <DomainSearch sessionId={this.props.admin.sessionId} />
                    </div>
                    <div className='requests'>
                        <AdminRequests sessionId={this.props.admin.sessionId} userId={this.props.admin.id} />
                    </div>
                </div>
            </div >
        );
    }

}

export default AdminHome;