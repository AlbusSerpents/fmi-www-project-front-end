import React, { Component } from 'react';
import '../styles/home.css';
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from "react-cookie";

class Home extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.handleUser = this.handleUser.bind(this);

        this.state = { user: null };
    }

    componentWillMount() {
        const { cookies } = this.props;
        const userCookie = cookies.get('user');
        if (userCookie) {
            this.setState({ user: userCookie });
        } else {
            this.setState({ authenticated: true });
        }
    }

    handleUser() {
        if (this.state.user != null) {
            return <h2> Hello, {this.state.user.username} </h2>;
        } else {
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

export default withCookies(Home);