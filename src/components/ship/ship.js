
import React from 'react';

export default class Ship extends React.Component {
  constructor (props) {
    super(props);
    console.log("ship props", props);
    this.state = {
      selectedShip: {name: "sample"},
      shipList: props.shipList,
    }
    this.findShip(props);
  }
  findShip(props) {
    let hayStack = props.shipList;
    var shipParams = this.props.match.params.shipName
    hayStack = hayStack.filter(ship => ship.name === shipParams);
    console.log("hayStack", hayStack, props);
    this.state = {
      selectedShip: hayStack[0]
    }
  }



  render() {
    return (
      <div>
        <div className="content">
              Wows Battle Field Guide
                Ship's Page!!!!!!!!!!!!
                <div>{this.state.selectedShip.name}</div>
                <div>{this.state.selectedShip.tier}</div>
                <div>{this.state.selectedShip.type}</div>
                <div>{this.state.selectedShip.nation }</div>
                <div>{this.state.selectedShip.name}</div>
                <div>{this.state.selectedShip.name}</div>
                <div>{this.state.selectedShip.name}</div>

        </div>
      </div>
    )
  }
}
