import React from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
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
      },
      dropdownOpen: false,
      convert: {Destroyer: "DD", Cruiser: "CL/CA", Battleship: "BB", AirCarrier: "CV", france: "FN", uk: "RN", germany: "KM", ussr: "VMF", usa: "USN", japan: "IJN"},
      showPrem: false,
      showNation: false,
      showType: false
    };
    this.buildButtonGrp("tier");
    this.toggle = this.toggle.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  toggle() {
    if (this.state.dropdownOpen) {
      this.setState({
        dropdownOpen: false
      });
    }else if (!this.state.dropdownOpen){
      this.setState({
        dropdownOpen: true
      });
    }
  }

  convertName(name) {
    if (this.state.convert.hasOwnProperty(name)) {
      return this.state.convert[name]
    } else if (typeof name === "number") {
      return this.convertToRoman(name)
    } else {
      return name.toString()
    }
  }

  convertToRoman(num) {
    var roman = { X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    var str = '';

    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }
    return str;
  }

  // Generate button groups based on available ship parameters, incase they add more nations, tiers, classes, etc
  buildButtonGrp(param) {
    let arr = [];
    let arrN = [];
    let arrM = [];
    let filter = Object.assign( {}, this.state.filter);
    // build an array that wont build duplicate buttons
    this.props.shipList.map(
      ship => {
        if (!arr.includes(ship[param])) {
          arr.push(ship[param]);
        }
      }
    )
    // if the array is an array of nations, break appart nations array to group smaller nations together for a dropdown option
    if (arr.includes("japan")) {
      arr.map(
        shipName => {
          if (shipName === "japan" || shipName === "usa" || shipName === "ussr" || shipName === "germany" || shipName === "uk" || shipName === "france") {
            arrN.push(shipName);
          } else {
            arrM.push(shipName);
          }
        }
      )
    }
    // sort the tier parameter array to sort the button order
    if (typeof arr[0] == "number") {
      arr = arr.sort((a, b) => a - b);
      // need to convert numbers to roman numerals
    } else {
      arr = arr.sort();
    }

    // if there is a second list of nations, build the special nations button group
    if (arrM.length > 0) {
      return (
        <div>
          {
            arrN.map(
              shipParam => {
                return (
                  <Button
                  outline
                  color={"primary"}
                  key={shipParam + "shipListFilter"}
                  onClick={(e) => this.handleFilterChange(e, shipParam)}
                  active={filter[param] === shipParam}
                  value={param}>
                  {this.convertName(shipParam)}
                  </Button>
                )
              }
            )
          }
          <ButtonDropdown active={true} direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret outline color={"secondary"}>

          </DropdownToggle>
          <DropdownMenu>
          {
            arrM.map(
              shipParam => {
                return (
                  <DropdownItem key={shipParam + "shipListFilter"}>
                    <Button outline
                    color={"primary"}
                    key={shipParam + "shipListFilter"}
                    onClick={(e) => this.handleFilterChange(e, shipParam)}
                    active={filter[param] === shipParam}
                    value={param}>
                    {shipParam.toString()}
                    </Button>
                  </DropdownItem>
                )
              }
            )
          }
          </DropdownMenu>
          </ButtonDropdown>
        </div>
      )
    }
    // else if not a special nations button group
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
              {this.convertName(shipParam)}
            </Button>
          )
        }
      )
    )
  }

  showBtns(shipValue) {
    console.log("showBtns shipValue", shipValue);
    if (shipValue === "tier") {
      this.setState({
        showType: true
      })
    } else if (shipValue === "type") {
      this.setState({
        showNation: true
      })
    } else if (shipValue === "nation") {
      this.setState({
        showPrem: true
      })
    } else if (shipValue === "prefill"){
      this.setState({
        showType: false,
        showNation: false,
        showPrem: false
      })
    }
  }

  handleFilterChange(event, shipValue) {
    event.preventDefault();
    let shipTypeValue = event.target.value;
    this.showBtns(shipTypeValue)
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
        filter: {
          tier: "0",
          type: "0",
          nation: "0"
        }
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
            Please select your ship's tier to find your ship and begin
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>
              {this.buildButtonGrp("tier")}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>-</Row>
        { this.state.showType &&
        <Row>
          <Col>
          <Row><Col>Often, tier and class are all that is needed</Col></Row>
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
      }
        <Row>-</Row>
        { this.state.showNation &&
        <Row>
          <Col>
          <Row><Col>feel free to filter by nation as well</Col></Row>
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
      }
        <Row>-</Row>
        { this.state.showPrem &&
        <Row>
          <Col>
          <Button
          outline
          color={"warning"}
          key={"0qualityshipListFilter"}
          onClick={(e) => this.handleFilterChange(e, "prefill")}
          value={"prefill"}>
          {"Reset All"}
          </Button>

          </Col>
        </Row>
        }
      </div>
    )
  }
}
