import React, { Component } from 'react';

import RequestsService from '../../logic/requests/RequestsService';

class AdminRequestBuble extends Component {

    constructor(props) {
        super(props);
        this.service = new RequestsService(this.props.sessionId);
    }

    render() {
        console.log(this.props.request);
        return (
            <div>
                <div>Client Name: {this.props.request.client}</div>
                <div>Faculty Number: {this.props.request.facultyNumber}</div>
                <div>Requested Domain Name: {this.props.request.domain}</div>
                <div>Domain Descripiton: {this.props.request.description}</div>
            </div>
        );
    }

}

export default AdminRequestBuble;