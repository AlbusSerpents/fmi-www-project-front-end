import React, { Component } from 'react';
import '../../styles/requests-form.css';

class RequestsForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameValue = this.handleNameValue.bind(this);

        this.state = {
            name: null,
            description: null
        };
    }

    handleSubmit() {
        console.log(this.state.name);
        console.log(this.state.description);

    }

    handleNameValue() {
        console.log(this.state.name);
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