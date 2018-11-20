
import React from 'react';

export default class Ship extends React.Component {
  constructor (props) {
    super(props);
    console.log("ship props", props);
    this.state = {
      selectedShip: "",
      shipList: [

      ],
      filteredShips: []
    }
  }



  render() {
    return (
      <div>
      <div className="content">
              Wows Battle Field Guide
                Ship's Page!!!!!!!!!!!!

        </div>
      </div>
    )
  }
}
