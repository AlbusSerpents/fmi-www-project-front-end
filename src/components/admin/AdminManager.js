import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../../styles/admin-manage.css';

import AdminNavBar from './AdminNavBar'
import AdminManagementBuble from './AdminManagementBuble'

import MangeService from '../../logic/manage/ManageService'

class AdminManager extends Component {

    constructor(props) {
        super(props);

        this.service = new MangeService(this.props.admin.sessionId);

        this.getUsers = this.getUsers.bind(this);
        this.drawUsers = this.drawUsers.bind(this);

        this.state = { users: [] };
    }

    componentWillMount() {
        this.getUsers();
    }

    getUsers() {
        this.service
            .getClients()
            .then(result => this.setState({ users: result }))
            .catch(error => alert(error));
    }

    drawUsers() {
        const users = this.state.users;
        return users.map(user => <AdminManagementBuble key={user.id} data={user} refreshCallback={this.getUsers} sessionId={this.props.admin.sessionId} />)
    }

    render() {
        return this.props.admin === undefined ? <Redirect to='/' /> : (
            <div id='admin-manage'>
                <AdminNavBar admin={this.props.admin} />
                <div id='users'>
                    <li>
                        {this.drawUsers()}
                    </li>
                </div>
            </div >
        );
    }

}

export default AdminManager;