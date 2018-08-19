import React, { Component } from 'react';

import '../../styles/admin-requests.css'

import RequestsService from '../../logic/requests/RequestsService';

import AdminRequestBuble from './AdminRequestBuble'

class AdminRequests extends Component {

    constructor(props) {
        super(props);
        this.service = new RequestsService(this.props.sessionId);

        this.drawRequests = this.drawRequests.bind(this);
        this.getRequests = this.getRequests.bind(this);

        this.state = { requests: [] };
    }

    componentWillMount() {
        this.getRequests();
    }

    getRequests() {
        this.service
            .getPending()
            .then(requests => this.setState({ requests: requests }));
    }

    drawRequests() {
        const requests = this.state.requests;
        return requests.map(request => <AdminRequestBuble key={request.id} sessionId={this.props.sessionId} request={request} refreshCallback={this.getRequests} />);
    }

    render() {
        return (
            <div id='pending-requests'>
                <div id='requests-title'>Domain Rqeuests</div>
                <li id='pending-requests-list'>
                    {this.drawRequests()}
                </li>
            </div>
        );
    }

}

export default AdminRequests;