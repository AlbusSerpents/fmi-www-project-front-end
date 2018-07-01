import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar'
import { Button } from 'semantic-ui-react';

class App extends Component {

  constructor(props) {
    super(props);
    this.getStatus = this.getStatus.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
  }

  getStatus() {
    // var status = fetch('https://localhost:8080/status', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         firstParam: 'yourValue',
    //         secondParam: 'yourOtherValue',
    //     })
    // });

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

  render() {
    return (
      <div>
        <NavBar />
        <div className="App">
          <LoginForm />
          <Button content='Click Me' onClick={this.getStatus} />
          <p>
            {this.handleStatus()}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
