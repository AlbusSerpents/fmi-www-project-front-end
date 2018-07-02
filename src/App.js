import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Home from './components/Home'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props);
    this.getStatus = this.getStatus.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleBaseUrl = this.handleBaseUrl.bind(this);
    this.state = { user: this.props.user };
  }

  getStatus() {
    var status = fetch('http://localhost:8080/status',
      { method: 'GET' })
      .then(response => { console.log(response); return response })
      .then(response => { return response.json(); })
      .then(body => {
        console.log(body)
        const appName = body.applicationName;
        this.setState({ appName });
      });
  }

  handleStatus() {
    if (this.state == null || this.state.appName == null) {
      return 'Unknown';
    } else {
      return this.state.appName;
    }
  }

  handleBaseUrl() {
    return (this.state.user == null) ? <Redirect to='/login' /> : <Redirect to='/home' />;
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <div className="App">
            <Button content='Click Me' onClick={this.getStatus} />
            <p>
              {this.handleStatus()}
            </p>
          </div> */}
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
