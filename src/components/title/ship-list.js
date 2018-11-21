import React from 'react';
import { Link, Redirect } from 'react-router-dom';




import {
  UncontrolledTooltip,
  Table,
  Row,
  Col } from 'reactstrap';

export default class ShipList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      shipList: this.props.shipList
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ship) {

    console.log("props", this.props, ship);
    this.props.history.push(`/ship/${ship.name}`);
    // will pass ship name in params and pick up ship with params ship name and filtering list, then display
  }

  render() {
    let that = this;
    return (
      <div>
        <Row>
          <Col>
            ShipList
          </Col>
        </Row>
        <Row>
        <Col></Col>
          <Col>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Nation</th>
                  <th>is_premium</th>
                </tr>
              </thead>
              <tbody>
              {
                this.props.filteredShips.map(
                  function (ship) {
                    return(
                      <tr key={ship.name + "shipTable"} id={"tooltip" + ship.ship_id_str} onClick={() => that.handleClick(ship)}>
                        <td>{ship.tier}</td>
                        <td>{ship.name}</td>
                        <td>{ship.type}</td>
                        <td>{ship.nation}</td>
                        <td>{ship.is_premium.toString()}</td>
                        <UncontrolledTooltip placement="right" target={"tooltip" + ship.ship_id_str}>
                          {ship.description}
                        </UncontrolledTooltip>
                      </tr>
                    )
                  }
                )
              }
              </tbody>
            </table>
          </Col>
          <Col></Col>
        </Row>
      </div>
    )
  }
}
