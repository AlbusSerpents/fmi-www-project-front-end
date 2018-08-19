import React, { Component } from 'react';

import '../../styles/admin-requests.css'

import RequestsService from '../../logic/requests/RequestsService';

class AdminRequestBuble extends Component {

    constructor(props) {
        super(props);
        this.service = new RequestsService(this.props.sessionId);

        this.drawComponent = this.drawComponent.bind(this);
        this.drawDescription = this.drawDescription.bind(this);

        this.approve = this.approve.bind(this);
        this.reject = this.reject.bind(this);
    }

    drawComponent(title, value) {
        return (
            <div><u>{title}</u>{value}</div>
        );
    }

    drawDescription() {
        const description = this.props.request.description;
        if (description !== undefined && description !== null && description !== '') {
            return this.drawComponent('Domain Descripiton: ', this.props.request.description);
        }
    }

    approve() {
        this.service
            .approve(this.props.request.id)
            .then(a => {console.log(a); return a;})
            .then(message => alert(message))
            .then(result => this.props.refreshCallback())
            .catch(message => alert(message));
    }

    reject() {
        this.service
            .reject(this.props.request.id)
            .then(a => {console.log(a); return a;})
            .then(message => alert(message))
            .then(result => this.props.refreshCallback())
            .catch(message => alert(message));
    }

    render() {
        return (
            <div id='admin-request-buble'>
                <div className='info'>
                    {this.drawComponent('Client Name: ', this.props.request.client)}
                    {this.drawComponent('Faculty Number: ', this.props.request.facultyNumber)}
                    {this.drawComponent('Requested Domain Name:', this.props.request.domain)}
                    {this.drawDescription()}
                </div>
                <div className='buttons'>
                    <input type='button' value='Approve' onClick={(e) => this.approve()} /><br />
                    <input type='button' value='Reject' onClick={(e) => this.reject()} />
                </div>
            </div>
        );
    }

}

export default AdminRequestBuble;