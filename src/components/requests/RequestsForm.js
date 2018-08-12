import React, { Component } from 'react';
import '../../styles/requests-form.css';

import RequestsService from '../../logic/requests/RequestsService'

class RequestsForm extends Component {

    constructor(props) {
        super(props);
        this.service = new RequestsService(this.props.sessionId, this.props.zoneName);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameValue = this.handleNameValue.bind(this);

        this.state = {
            name: null,
            description: null
        };
    }

    handleSubmit() {
        const name = this.state.name;
        const description = this.state.description;
        this.service
            .submitRequest(name, description)
            .then(result => alert(result))
            .catch(error => alert(error.message));
    }

    handleNameValue() {
        return this.state.name === null ? this.props.zoneName : this.state.name + this.state.name;
    }

    render() {
        return (
            <div className='requests-form'>
                <div className='requests-domain-fields'>
                    <div className='requests-form-text'>Domain Name: <br /></div>
                    <input type='text' className='requests-domain-name-input' onChange={e => this.setState({ name: e.target.value })} />{this.props.zoneName}<br />
                    <div className='requests-form-text'>Description (Optional): <br /></div>
                    <input type='text' className='requests-domain-description' onChange={e => this.setState({ description: e.target.value })} /><br />
                </div>
                <div className='requests-submit-button'>
                    <input type='button' value='Submit' onClick={e => this.handleSubmit()} />
                </div>
            </div>
        );
    }

}

export default RequestsForm;