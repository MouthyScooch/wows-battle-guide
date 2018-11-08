import React from 'react';

import {
  Tooltip } from 'reactstrap';

import logo from './logo.png';


export default class ShipSpin extends React.Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    }
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <header className="App-header">

      <img src={logo} className="App-logo" alt="logo" />
      <p>A <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">tooltip</span>.</p>
      <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
        Hello world!
      </Tooltip>

      </header>
    )
  }
}
