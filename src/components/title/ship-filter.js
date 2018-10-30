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
      shipFilter: {},
      shipList: this.props.shipList
    }
  }

  // Generate button groups based on available ship parameters, incase they add more nations, tiers, classes, etc
  buildButtonGrp(type) {
    let arr = [];
    return (
      this.state.shipList.map(
        ship => {
          if (!arr.includes(ship[type])) {
            arr.push(ship[type]);
            return <Button key={ship[type] + "shipListFilter"}>{ship[type]}</Button>
          }
        }
      )
    )

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
            {this.buildButtonGrp("tier")}
          </ButtonGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            {this.buildButtonGrp("class")}
          </ButtonGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            {this.buildButtonGrp("nation")}
          </ButtonGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            {this.buildButtonGrp("quality")}
          </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}
