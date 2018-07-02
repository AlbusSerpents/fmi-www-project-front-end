import React, { Component } from 'react';
import '../styles/home.css';
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom'

class Home extends Component {

    constructor(props) {
        super(props);

        this.handleUser = this.handleUser.bind(this);

        this.state = { user: null };
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props && this.props.user && this.props.user.location && this.props.user.location.redirect && this.props.user.location.redirect.data) {
            this.props.user.location.redirect.data.then((user) => { this.setState({ user }) });
        } else {
            this.setState({ unauthenticated: true });
        }
    }

    handleUser() {
        if (this.state.user) {
            return <h2> Hello, {this.state.user.username} </h2>;
        } else if (this.state.unauthenticated) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div className='Home'>
                <NavBar />
                <br />
                {this.handleUser()}
            </div>
        );
    }

}

export default Home;