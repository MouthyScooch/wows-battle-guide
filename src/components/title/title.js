
import React from 'react';

import ShipSearch from './ship-search.js';
import ShipFilter from './ship-filter.js';
import ShipList from './ship-list.js';
import ShipSpin from '../ship-spin.js';

import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Tooltip } from 'reactstrap';

export default class Title extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedShip: "",
      shipList: [],
      shipFilter: {}
    }
  }

  render() {
    return (
      <div>
        <Container>
              Wows Battle Field Guide
                <ShipFilter />
                <ShipList />
                <ShipSearch />
                <ShipSpin/>
        </Container>
      </div>
    )
  }
}
