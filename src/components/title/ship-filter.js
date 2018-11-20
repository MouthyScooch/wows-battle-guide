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

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  // Generate button groups based on available ship parameters, incase they add more nations, tiers, classes, etc
  buildButtonGrp(param) {
    let arr = [];
    let filter = Object.assign( {}, this.state.filter);
    // build an array that wont build duplicate buttons
    this.props.shipList.map(
      ship => {
        if (!arr.includes(ship[param])) {
          arr.push(ship[param]);
        }
      }
    )
    // sort the tier parameter array to sort the button order
    if (typeof arr[0] == "number") {
      arr = arr.sort((a, b) => a - b);
    } else {
      arr = arr.sort();
    }
    return (
      arr.map(
        shipParam => {
          return (
            <Button
            key={shipParam + "shipListFilter"}
            onClick={(e) => this.handleFilterChange(e, shipParam)}
            active={filter[param] === shipParam}
            value={param}>
              {shipParam.toString()}
            </Button>
          )
        }
      )
    )
  }

  handleFilterChange(event, shipValue) {
    event.preventDefault();
    let shipTypeValue = event.target.value;
    // build object, regardless of the filter's state.
    let filter = Object.assign( {}, this.state.filter);
    filter[shipTypeValue] = shipValue;
    // bring filter into memory
    let arr = this.state.filterArr;
    if (!this.state.filterArr.includes(shipTypeValue)) {
      // add a new filter param
      arr.push(shipTypeValue);
      this.setState({
        filterArr: arr,
        filter: filter
      });
      this.props.filterShips(filter);
    } else {
      // add conditional later to check if filter already exsists, so setState doesn't need to be called
      this.setState({
        filter
      });
      this.props.filterShips(filter);
    }
    if (shipTypeValue === "prefill") {
      // reset the whole filter
      this.setState({
        filterArr: [],
        filter: {}
      });
    }
    if (shipTypeValue === "reset") {
      // reset only one filter param
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
            <ButtonGroup size="sm">
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
            <ButtonGroup size="sm">
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
            <ButtonGroup size="sm">
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
            <ButtonGroup size="sm">
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
