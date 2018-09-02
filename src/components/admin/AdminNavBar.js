import React, { Component } from 'react';
import '../../styles/nav-bar.css'
import { Redirect } from 'react-router-dom'

import SessionHandler from '../../networking/SessionHandler'

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
            admin: this.props.admin
         };
    }

    executeRedirect() {
        if (this.state.redirect != null) {
            return <Redirect to={{ pathname: this.state.redirect, state: { admin: this.state.admin } }} />
        }
    }

    navBarElement(action, text) {
        return (
            <li className='admin-nav-list-bar-element'>
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
        const sessionId = this.state.admin.sessionId;
        this.handler.logout(sessionId);
        this.setState({admin: null});
        return this.changePage('/admin');
    }

    render() {
        return (
            <div className='nav-bar'>
                {this.executeRedirect()}
                <ul className='nav-bar-list'>
                    {this.navBarElement(() => this.changePage('/admin'), 'Home')}
                    {this.navBarElement(() => this.changePage('/admin/manage'), 'Manage')}
                    {this.navBarElement(() => this.logout(), 'Logout')}
                </ul>
            </div>
        );
    }

}

export default NavBar;