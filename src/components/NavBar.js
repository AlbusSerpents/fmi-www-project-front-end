import React, { Component } from 'react';
import '../nav-bar.css'
import { Link, Redirect } from 'react-router-dom'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.navBarElement = this.navBarElement.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.state = { redirect: null };
    }

    renderRedirect() {
        if (this.state.redirect != null) {
            return <Redirect to={this.state.redirect} />
        }
    }

    navBarElement(value, text) {
        return (
            <li className='nav-bar-element'>
                <button className='nav-bar-button' onClick={() => this.setState({ redirect: value })}>
                    {text}
                </button>
            </li>
        );
    }

    render() {
        return (
            <div className='nav-bar'>
                {this.renderRedirect()}
                <ul className='nav-bar-list'>
                    {this.navBarElement('/home', 'Home')}
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