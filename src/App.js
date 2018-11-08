import React, { Component } from 'react';

import Title from './components/title/title.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Title />
        </main>
      </div>
    );
  }
}

export default App;
