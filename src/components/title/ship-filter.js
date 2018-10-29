import React from 'react';

import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Tooltip } from 'reactstrap';

export default class ShipFilter extends React.Component {
  constructor (props) {
    super(props);



    this.state = {
      shipFilter: {},
      shipList: [
        {nation: "IJN", tier: "X"},
        {nation: "USN", tier: "IX", torps: "2"}
      ]
    }
  }

  buildButtonGrp(type) {
    return (
      this.state.shipList.map(
        ship => <Button key={ship[type] + "shipListFilter"}>{ship[type]}</Button>
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
            {this.buildButtonGrp("nation")}
          </ButtonGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <ButtonGroup>
            {this.buildButtonGrp("tier")}
          </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}
