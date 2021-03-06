import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../../styles/profile.css'

import NavBar from './../NavBar'
import ProfileView from './ProfileView'

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            authenticated: false
        };
    }

    render() {
        return this.props.user === undefined ? <Redirect to='/' /> : (
            <div className='profiles'>
                <NavBar user={this.props.user} />
                <div className='profile-view-position'>
                    <ProfileView id={this.state.user.id} session={this.state.user.sessionId} />
                </div>
            </div >
        );
    }

}

export default Profile;