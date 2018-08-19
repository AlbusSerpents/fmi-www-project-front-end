import React, { Component } from 'react';

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
        return requests.map(request => <AdminRequestBuble sessionId={this.props.sessionId} request={request} refreshCallback={this.getRequests} />);
    }

    render() {
        return (
            <div>
                <div >
                    Domain Rqeuests
                    <div id='pending-requests-list'>
                        <li>
                            {this.drawRequests()}
                        </li>
                    </div>
                </div>
            </div>
        );
    }

}

export default AdminRequests;