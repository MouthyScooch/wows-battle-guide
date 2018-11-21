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
      filter: {
        tier: "0",
        type: "0",
        nation: "0"
      }
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
            outline
            color={"primary"}
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
    // the filter object is updated
    filter[shipTypeValue] = shipValue;
    // bring filter arr into memory
    let arr = this.state.filterArr;
    // check if value is in button array already and add it if it isn't
    if (!this.state.filterArr.includes(shipTypeValue)) {
      // add a new filter param and set the new filter to state
      arr.push(shipTypeValue);
      this.setState({
        filterArr: arr,
        filter: filter
      });
      // filter shipList with new filter
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
      // set param to null status
      filter[shipValue] = "0";
      // remove the reset param
      delete filter.reset;
      // remove reset param from arr
      arr = arr.filter(e => e !== "reset");
      // set the new filter and filter shipList
      this.setState({
        filterArr: arr,
        filter: filter
      }, () => this.props.filterShips(this.state.filter));
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
              outline
              color={"primary"}
              key={"0tiershipListFilter"}
              onClick={(e) => this.handleFilterChange(e, "tier")}
              active={this.state.filter.tier === "0"}
              value={"reset"}>
                {"0"}
              </Button>
              {this.buildButtonGrp("tier")}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>-</Row>
        <Row>
          <Col>
            <ButtonGroup>
              <Button
              outline
              color={"primary"}
              key={"0classshipListFilter"}
              onClick={(e) => this.handleFilterChange(e, "type")}
              active={this.state.filter.type === "0"}
              value={"reset"}>
                {"0"}
              </Button>
              {this.buildButtonGrp("type")}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>-</Row>
        <Row>
          <Col>
            <ButtonGroup>
              <Button
              outline
              color={"primary"}
              key={"0nationshipListFilter"}
              onClick={(e) => this.handleFilterChange(e, "nation")}
              active={this.state.filter.nation === "0"}
              value={"reset"}>
                {"0"}
              </Button>
              {this.buildButtonGrp("nation")}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>-</Row>
        <Row>
          <Col>
          <Button
          outline
          color={"warning"}
          key={"0qualityshipListFilter"}
          onClick={(e) => this.handleFilterChange(e, "prefill")}
          value={"prefill"}>
          {"All 0"}
          </Button>
            <ButtonGroup>
            on sale
              {this.buildButtonGrp("is_premium")}
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}
