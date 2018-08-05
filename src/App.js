import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Domains from './components/domains/Domains'
import Requests from './components/requests/Requests'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleBaseUrl = this.handleRoot.bind(this);
    this.state = { user: this.props.user };
  }

  handleRoot() {
    return (this.state.user == null) ? <Redirect to='/login' /> : <Redirect to='/domains' />;
  }

  render() {
    return (
      <BrowserRouter>
        <CookiesProvider>
          <Route path='/' exact render={() => this.handleRoot()} />
          <Route path='/login' exact render={() => <LoginForm />} />
          <Route path='/domains' exact render={() => <Domains />} />
          <Route path='/request' exact render={ () => <Requests/ >}/>
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
