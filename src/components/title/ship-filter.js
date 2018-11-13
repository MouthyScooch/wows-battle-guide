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
      shipList: this.props.shipList,
      filterArr: []
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  // Generate button groups based on available ship parameters, incase they add more nations, tiers, classes, etc
  buildButtonGrp(type) {
    let arr = [];
    this.props.shipList.map(
      ship => {
        if (!arr.includes(ship[type])) {
          arr.push(ship[type]);
        }
      }
    )
    if (typeof arr[0] == "number") {
      arr = arr.sort((a, b) => a - b);
    } else {
      arr = arr.sort();
    }
    return (
      arr.map(
        ship => {
          return (
            <Button
            key={ship + "shipListFilter"}
            onClick={(e) => this.handleFilterChange(e, ship)}
            active={this.state.ship === ship}
            value={type}>
              {ship.toString()}
            </Button>
          )
        }
      )
    )
  }

  handleFilterChange(event, ship) {
    event.preventDefault();
    this.setState({ ship });
    let shipTypeValue = event.target.value;
    if (!this.state.filterArr.includes(shipTypeValue)) {
      let arr = this.state.filterArr;
      arr.push(shipTypeValue);
      this.setState({
        filterArr: arr
      });
      this.props.filterShips(shipTypeValue, ship.toString());
    }
    if (shipTypeValue === "prefill") {
      this.setState({
        filterArr: []
      });
    }
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
              onClick={(e) => this.handleFilterChange(e, "prefill")}
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
              onClick={(e) => this.handleFilterChange(e, "prefill")}
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
              onClick={(e) => this.handleFilterChange(e, "prefill")}
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
              onClick={(e) => this.handleFilterChange(e, "prefill")}
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
