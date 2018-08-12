import React, { Component } from 'react';

import ProfileService from '../../logic/profile/ProfileService'

class ProfileView extends Component {

    constructor(props) {
        super(props);
        this.service = new ProfileService(this.props.id, this.props.session);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.oldPass = React.createRef();
        this.newPass = React.createRef();

        this.state = {
            name: null,
            loginName: null,
            facultyNumber: null,
            email: null,
            ready: false,
            newEmail: null,
            oldPassword: null,
            newPassword: null,
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
                ready: result.success,
                oldPassword: null,
                newPassword: null
            }))
            .catch(error => alert(error.message));
            if(this.oldPass.value !== undefined){
                this.oldPass.value = null;
            }
            if(this.newPass.value !== undefined){
                this.newPass.value = null;
            }
    }

    handleUpdate() {
        const update = {
            oldEmail: this.state.email,
            newEmail: this.state.newEmail,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
        }
        this.service
            .updateClient(update)
            .then(result => alert(result))
            .then(() => this.getProfile())
            .catch(error => alert(error.message));

        this.setState({ refresh: true, oldPassword: null, newPassword: null });
    }

    render() {
        return !this.state.ready ?
            null :
            (
                <div className='profile-view'>
                    <div className='view-part'>
                        <div className='title'> Profile Info: </div>
                        <ProfileField name='Name' value={this.state.name} />
                        <ProfileField name='Login Name' value={this.state.loginName} />
                        <ProfileField name='№' value={this.state.facultyNumber} />
                    </div>
                    <div className='view-part'>
                        <div className='title'>Email:</div>
                        <input type='email' value={this.state.email ? this.state.email : ''} onChange={e => this.setState({ newEmail: e.target.value, email: e.target.value })} />
                    </div>
                    <div className='view-part'>
                        <div className='title'>Change Password <br /></div>
                        Old Password: <input type='password' onChange={e => this.setState({ oldPassword: e.target.value })} ref={el => this.oldPass = el} /><br />
                        New Password: <input type='password' onChange={e => this.setState({ newPassword: e.target.value })} ref={el => this.newPass = el} /><br />
                    </div>

                    <div className='profile-submit-button'>
                        <input type='button' value='Update profile' onClick={e => this.handleUpdate()} />
                    </div>
                </div >
            );
    }

}

class ProfileField extends Component {
    render() {
        return (
            <div>
                <div className='profile-field-name'>{this.props.name}:</div>
                <div className='profile-field-value'>{this.props.value}</div>
                <br />
            </div>
        );
    }
}

export default ProfileView;