import React from 'react';

import {
  Button,
  ButtonGroup,
  Row,
  Col } from 'reactstrap';

export default class ShipFilter extends React.Component {
  constructor (props) {
    super(props);


    this.state = {
      shipList: this.props.shipList
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  // Generate button groups based on available ship parameters, incase they add more nations, tiers, classes, etc
  buildButtonGrp(type) {
    let arr = [];
    return (
      this.props.shipList.map(
        ship => {
          if ((typeof ship[type]) != "string") {
            ship[type] = ship[type].toString();
          };
          if (!arr.includes(ship[type])) {
            arr.push(ship[type]);
            return (
              <Button
              key={ship.name + "shipListFilter"}
              onClick={this.handleFilterChange}
              value={type}>
                {ship[type]}
              </Button>
            )
          }
        }
      )
    )
  }

  handleFilterChange(event) {
    this.props.filterShips(event.target.value, event.target.innerHTML);
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            ShipFilter
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            <Button
            key={"0tiershipListFilter"}
            onClick={this.handleFilterChange}
            value={"prefill"}>
              {0}
            </Button>
            {this.buildButtonGrp("tier")}
          </ButtonGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            <Button
            key={"0classshipListFilter"}
            onClick={this.handleFilterChange}
            value={"prefill"}>
              {0}
            </Button>
            {this.buildButtonGrp("type")}
          </ButtonGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            <Button
            key={"0nationshipListFilter"}
            onClick={this.handleFilterChange}
            value={"prefill"}>
              {0}
            </Button>
            {this.buildButtonGrp("nation")}
          </ButtonGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            <Button
            key={"0qualityshipListFilter"}
            onClick={this.handleFilterChange}
            value={"prefill"}>
              {0}
            </Button>
            is premium
            {this.buildButtonGrp("is_premium")}
          </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}
