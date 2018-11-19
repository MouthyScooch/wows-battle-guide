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
      filterArr: [],
      filter: {}
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  // Generate button groups based on available ship parameters, incase they add more nations, tiers, classes, etc
  buildButtonGrp(type) {
    let arr = [];
    let filter = Object.assign( {}, this.state.filter);
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
            active={filter[type] === ship}
            value={type}>
              {ship.toString()}
            </Button>
          )
        }
      )
    )
  }

  handleFilterChange(event, shipValue) {
    event.preventDefault();
    let shipTypeValue = event.target.value;
    let filter = Object.assign( {}, this.state.filter);
    filter[shipTypeValue] = shipValue;
    let arr = this.state.filterArr;
    if (!this.state.filterArr.includes(shipTypeValue)) {
      arr.push(shipTypeValue);
      this.setState({
        filterArr: arr,
        filter: filter
      });
      this.props.filterShips(filter);
    } else {
      this.setState({
        filter
      });
      this.props.filterShips(filter);
    }
    if (shipTypeValue === "prefill") {
      this.setState({
        filterArr: [],
        filter: {}
      });
    }
    if (shipTypeValue === "reset") {
      delete filter[shipValue];
      delete filter.reset;
      arr = arr.filter(e => e !== shipValue);
      arr = arr.filter(e => e !== "reset");
      this.setState({
        filterArr: arr,
        filter: filter
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
              onClick={(e) => this.handleFilterChange(e, "tier")}
              value={"reset"}>
                {"reset Tier"}
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
              onClick={(e) => this.handleFilterChange(e, "type")}
              value={"reset"}>
                {"reset Class"}
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
              onClick={(e) => this.handleFilterChange(e, "nation")}
              value={"reset"}>
                {"reset Nation"}
              </Button>
              {this.buildButtonGrp("nation")}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>
            is premium
              <Button
              key={"0qualityshipListFilter"}
              onClick={(e) => this.handleFilterChange(e, "prefill")}
              value={"prefill"}>
                {"reset All"}
              </Button>
              {this.buildButtonGrp("is_premium")}
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}
