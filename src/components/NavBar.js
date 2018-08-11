import React, { Component } from 'react';
import '../styles/nav-bar.css'
import { Redirect } from 'react-router-dom'

import SessionHandler from '../networking/SessionHandler'

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.navBarElement = this.navBarElement.bind(this);
        this.executeRedirect = this.executeRedirect.bind(this);
        this.logout = this.logout.bind(this);
        this.changePage = this.changePage.bind(this);
        this.handler = new SessionHandler();
        this.state = { 
            redirect: null,
            user: this.props.user
         };
    }

    executeRedirect() {
        if (this.state.redirect != null) {
            return <Redirect to={{ pathname: this.state.redirect, state: { user: this.state.user } }} />
        }
    }

    navBarElement(action, text) {
        return (
            <li className='nav-list-bar-element'>
                <div className='nav-bar-element'>
                    <button className='nav-bar-button' onClick={() => action()}>
                        {text}
                    </button>
                </div>
            </li>
        );
    }

    changePage(value){
        this.setState({ redirect: value })
    }

    logout(){
        const sessionId = this.state.user.sessionId;
        this.handler.logout(sessionId);
        this.setState({user: null});
        return this.changePage('/');
    }

    render() {
        return (
            <div className='nav-bar'>
                {this.executeRedirect()}
                <ul className='nav-bar-list'>
                    {this.navBarElement(() => this.changePage('/domains'), 'Domains')}
                    {this.navBarElement(() => this.changePage('/request'), 'Request Domain')}
                    {this.navBarElement(() => this.changePage('/profile'), 'Profile')}
                    {this.navBarElement(() => this.logout(), 'Login')}
                </ul>
            </div>
        );
    }

}

export default NavBar;