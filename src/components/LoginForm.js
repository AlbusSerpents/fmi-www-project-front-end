import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';
import NetworkingHandler from '../networking/NetworkHandler';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.networking = new NetworkingHandler();
        this.login = this.login.bind(this);
        this.username = this.username.bind(this);
        this.password = this.password.bind(this);
    }

    login() {
        const request = {
            'roleToken': 'a',
            'username': this.state.username,
            'password': this.state.password
        };
        this.networking.login(request, function (response) {
            console.log(response);
        });
    }

    username(event) {
        const username = event.target.value;
        this.setState({ username });
    }

    password(event) {
        const password = event.target.value;
        this.setState({ password })
    }

    render() {
        return (
            <Segment inverted color='grey' compact={true} size='huge'>
                <Form>
                    <Form.Group widths='equal' widths='equal' >
                        <Form.Input required label='Username' placeholder='Username' onChange={this.username} />
                        <Form.Input required type='password' label='Password' onChange={this.password} />
                    </Form.Group>
                    <Form.Button content='Log In' onClick={this.login} />
                </Form>
            </Segment>
        );
    }
}

export default LoginForm;