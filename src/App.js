import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Home from './components/home/Home';
import Domains from './components/domains/Domains'
import Requests from './components/requests/Requests'
import Profile from './components/profile/Profile'

import AdminLogin from './components/admin/AdminLogin'
import AdminHome from './components/admin/AdminHome'

class App extends Component {

  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
    this.getAdmin = this.getAdmin.bind(this);
  }

  getUser(props) {
    return props.location.state !== undefined && props.location.state !== null ? props.location.state.user : null;
  }

  getAdmin(props) {
    return props.location.state !== undefined && props.location.state !== null ? props.location.state.admin : null;
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/admin' exact render={() => <AdminLogin />} />
          <Route path='/admin/home' exact render={(props) => this.getAdmin(props) === null ? <Redirect to='/admin' /> : <AdminHome admin={this.getAdmin(props)} />} />
          <Route path='/login' exact render={() => <Home />} />
          <Route path='/' exact render={(props) => this.getUser(props) === null ? <Redirect to='/login' /> : <Domains user={this.getUser(props)} />} />
          <Route path='/domains' exact render={(props) => this.getUser(props) === null ? <Redirect to='/login' /> : <Domains user={this.getUser(props)} />} />
          <Route path='/request' exact render={(props) => this.getUser(props) === null ? <Redirect to='/login' /> : <Requests user={this.getUser(props)} />} />
          <Route path='/profile' exact render={(props) => this.getUser(props) === null ? <Redirect to='/login' /> : <Profile user={this.getUser(props)} />} />
          <Route path='/logout' exact render={
            () => { return (<h1>Lougout</h1>); }
          } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
