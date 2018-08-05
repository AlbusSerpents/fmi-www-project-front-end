import React, { Component } from 'react';
import '../styles/nav-bar.css'
import { Redirect } from 'react-router-dom'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.navBarElement = this.navBarElement.bind(this);
        this.executeRedirect = this.executeRedirect.bind(this);
        this.state = { redirect: null };
    }

    executeRedirect() {
        if (this.state.redirect != null) {
            return <Redirect to={{ pathname: this.state.redirect, state: { user: this.props.user } }} />
        }
    }

    navBarElement(value, text) {
        return (
            <li className='nav-list-bar-element'>
                <div className='nav-bar-element'>
                    <button className='nav-bar-button' onClick={() => this.setState({ redirect: value })}>
                        {text}
                    </button>
                </div>
            </li>
        );
    }

    render() {
        return (
            <div className='nav-bar'>
                {this.executeRedirect()}
                <ul className='nav-bar-list'>
                    {this.navBarElement('/domains', 'Domains')}
                    {this.navBarElement('/request', 'Request Domain')}
                    {this.navBarElement('/profile', 'Profile')}
                    {this.navBarElement('/logout', 'Logout')}
                </ul>
            </div>
        );
    }

}

export default NavBar;