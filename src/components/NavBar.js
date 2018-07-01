import React, { Component } from 'react';
import '../nav-bar.css'
import { Segment, Form } from 'semantic-ui-react';
import NetworkingHandler from '../networking/NetworkHandler';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.navBarElement = this.navBarElement.bind(this);
    }

    navBarElement(text) {
        return (
            <li className='nav-bar-element'>
                <button className='nav-bar-button'>{text}</button>
            </li>
        );
    }

    render() {
        return (
            <div className='nav-bar'>
                <ul className='nav-bar-list'>
                    {this.navBarElement('Home')}
                    {this.navBarElement('Domains')}
                    {this.navBarElement('Request Domain')}
                    {this.navBarElement('Profile')}
                    {this.navBarElement('Logout')}
                </ul>
            </div>
        );
    }

}

export default NavBar;