import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            AB or BC?... How to know you're in low tier
          </p>

        </header>
      </div>
    );
  }
}

export default App;
