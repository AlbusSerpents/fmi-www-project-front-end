import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../../styles/admin-home.css';

import AdminNavBar from './AdminNavBar'
import AdminRequests from './AdminRequests'
import DomainSearch from '../common/DomainSearch'

class AdminHome extends Component {

    render() {
        return this.props.admin === undefined ? <Redirect to='/' /> : (
            <div id='admin-home'>
                <AdminNavBar admin={this.props.admin} />
                <div id='admin-content'>
                    <div className='domains-search'>
                        <DomainSearch sessionId={this.props.admin.sessionId} />
                    </div>
                    <div id='admin-requests'>
                        <AdminRequests sessionId={this.props.admin.sessionId} userId={this.props.admin.id} />
                    </div>
                </div>
            </div >
        );
    }

}

export default AdminHome;