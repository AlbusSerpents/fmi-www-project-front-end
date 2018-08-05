import React, { Component } from 'react';

import ProfileService from '../../logic/profile/ProfileService'

class ProfileView extends Component {

    constructor(props) {
        super(props);
        this.service = new ProfileService(this.props.id, this.props.session);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.refresh = this.refresh.bind(this);

        this.state = {
            name: null,
            loginName: null,
            facultyNumber: null,
            email: null,
            ready: false,
            newEmail: null,
            oldPassword: null,
            newPassword: null,
            refresh: false
        }
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        this.service
            .getClient()
            .then(result => this.setState({
                name: result.name,
                loginName: result.loginName,
                facultyNumber: result.facultyNumber,
                email: result.email,
                ready: result.success
            }));

    }

    handleUpdate() {
        const update = {
            oldEmail: this.state.email,
            newEmail: this.state.newEmail,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
        }
        this.service.updateClient(update);
        alert('Update successfull');
        this.setState({ refresh: true, oldPassword: null, newPassword: null });
    }

    refresh() {
        if (this.state.refresh) {
            this.getProfile();
            this.setState({ refresh: false });
        }
    }

    render() {
        return !this.state.ready ?
            null :
            (
                <div className='profile-view'>
                    <div id='name'>Name: {this.state.name}</div>
                    <div id='loginName'>Login name: {this.state.loginName}</div>
                    <div id='faculty-number'>№: {this.state.facultyNumber}</div>

                    <div id='email'>
                        email: <input type='email' value={this.state.email ? this.state.email : ''} onChange={e => this.setState({ newEmail: e.target.value, email: e.target.value })} />
                    </div>
                    <div className='passwords'>
                        <div id='passwords-title'>Change Password <br /></div>
                        Old Password: <input type='password' onChange={e => this.setState({ oldPassword: e.target.value })} />
                        New Password: <input type='password' onChange={e => this.setState({ newPassword: e.target.value })} />
                    </div>

                    <div className='profile-submit-button'>
                        <input type='button' value='Update profile' onClick={e => this.handleUpdate()} />
                        {this.refresh()}
                    </div>
                </div >
            );
    }

}

export default ProfileView;