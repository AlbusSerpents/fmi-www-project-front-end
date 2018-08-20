import React, { Component } from 'react';

import '../../styles/admin-manage.css'

import ManageService from '../../logic/manage/ManageService';

class AdminRequestBuble extends Component {

    constructor(props) {
        super(props);
        this.service = new ManageService(this.props.sessionId);

        this.drawComponent = this.drawComponent.bind(this);

        this.delete = this.delete.bind(this);
    }

    drawComponent(title, value) {
        return (<div><u>{title}</u>{value}</div>);
    }

    delete() {
        this.service
            .deleteClient(this.props.data.id)
            .then(message => alert(message))
            .then(any => this.props.refreshCallback())
            .catch(message => alert(message));
    }

    render() {
        return (
            <div id='admin-manage-buble'>
                <div className='info'>
                    {this.drawComponent('Name: ', this.props.data.name)}
                    {this.drawComponent('Faculty Number: ', this.props.data.facultyNumber)}
                    {this.drawComponent('Email:', this.props.data.email)}
                </div>
                <div className='button'>
                    <input type='button' value='Delete' onClick={(e) => this.delete()} />
                </div>
            </div>
        );
    }

}

export default AdminRequestBuble;