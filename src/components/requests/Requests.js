import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../../styles/requests.css'

import NavBar from './../NavBar'
import RequestsForm from './RequestsForm'

class Requests extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return this.props.user === undefined ? <Redirect to='/' /> :
            (
                <div className='requests'>
                    <NavBar user={this.props.user} />
                    <div className='requests-form-position'>
                        <RequestsForm zoneName='.fmi.com' sessionId={this.props.user.sessionId} />
                    </div>
                </div >
            );
    }

}

export default Requests;