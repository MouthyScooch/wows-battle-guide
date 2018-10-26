import React, { Component } from 'react';

import Title from './components/title/title.js';

import { Container, Row, Col } from 'reactstrap';

import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Container >
      <Row>
      <Col />
      <Col>
      <main>
        <Title />
      </main>

        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <p>
            AB or BC?... How to know you're in low tier
          </p>

        </header>
        </Col>
        <Col />
        </Row>
        </Container>
      </div>
    );
  }
}

export default App;
