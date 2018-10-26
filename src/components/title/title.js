
import React from 'react';

import ShipSearch from './ship-search.js';
import ShipFilter from './ship-filter.js';
import ShipList from './ship-list.js';

import { Button, ButtonGroup, Container, Row, Col, Tooltip } from 'reactstrap';

export default class Title extends React.Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      selectedShip: "",
      shipList: [],
      shipFilter: {},
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
      <div>
      <Container>
      <Row>
      <Col>

        Title
        <ButtonGroup>
          <Button>26</Button>
          <Button>26</Button>
          <Button>26</Button>
        </ButtonGroup>
        <Button >Buttons</Button>
        <p>Somewhere in here is a <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">tooltip</span>.</p>
        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
          Hello world!
        </Tooltip>
        <ShipFilter />
        <ShipList />
        <ShipSearch />
        </Col>
        </Row>
        </Container>
      </div>
    )
  }
}
