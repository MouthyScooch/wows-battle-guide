
import React from 'react';

import ComparisonList from './comparison/comparison-list.js';

export default class Ship extends React.Component {
  constructor (props) {
    super(props);
    console.log("ship props", props);
    this.state = {
      selectedShip: {name: "sample"},
      shipList: props.shipList,
    }
    this.findShip(props);
    console.log("ship page props", props.shipList[0]);
  }
  findShip(props) {
    let hayStack = props.shipList;
    var shipParams = this.props.match.params.shipName
    hayStack = hayStack.filter(ship => ship.name === shipParams);
    console.log("hayStack", hayStack, props);
    this.state = {
      selectedShip: hayStack[0]
    };
  }



  render() {
    return (
      <div>
        <div className="content">
                <div>{this.state.selectedShip.name}</div>
                <img src={this.state.selectedShip.images.large} className="App-logo" alt="logo" />
                <ComparisonList shipList={this.props.shipList} selectedShip={this.state.selectedShip}/>

        </div>
      </div>
    )
  }
}
