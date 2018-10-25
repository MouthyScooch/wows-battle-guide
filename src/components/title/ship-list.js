import React from 'react';

export default class ShipList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      shipList: []
    }
  }

  render() {
    return (
      <div>
        ShipList
      </div>
    )
  }
}
