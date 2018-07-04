import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Home from './components/Home'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleBaseUrl = this.handleBaseUrl.bind(this);
    this.state = { user: this.props.user };
  }

  handleBaseUrl() {
    return (this.state.user == null) ? <Redirect to='/login' /> : <Redirect to='/home' />;
  }

  render() {
    return (
      <BrowserRouter>
        <CookiesProvider>
          <Route path='/' exact render={() => this.handleBaseUrl()} />
          <Route path='/login' exact render={() => <LoginForm />} />
          <Route path='/home' exact render={(user) => <Home user={user} />} />
          <Route path='/domains' exact render={
            () => { return (<h1>Domains</h1>); }
          } />
          <Route path='/request' exact render={
            () => { return (<h1>Request</h1>); }
          } />
          <Route path='/profile' exact render={
            () => { return (<h1>Profile</h1>); }
          } />
          <Route path='/logout' exact render={
            () => { return (<h1>Lougout</h1>); }
          } />
        </CookiesProvider>
      </BrowserRouter>
    );
  }
}

export default App;
