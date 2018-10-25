
import React from 'react';

import ShipSearch from './ship-search.js';
import ShipFilter from './ship-filter.js';
import ShipList from './ship-list.js';

export default class Title extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedShip: "",
      shipList: [],
      shipFilter: {},
    }
  }

  render() {
    return (
      <div>
        Title
        <ShipFilter />
        <ShipList />
        <ShipSearch />
      </div>
    )
  }
}
