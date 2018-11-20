import React from 'react';
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
    // will be a redirect to ship's homepage
    console.log(ship);
    alert(`"${ship.name}" would like to say hi :) this will eventually lead you to ${ship.name}'s home page, where the app will really begin. Thanks guys`);
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
            <Table dark>
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
                this.props.shipList.map(
                  function (ship) {
                    return(
                      <tr key={ship.name + "shipTable"} id={"tooltip" + ship.ship_id_str} onClick={() => that.handleClick(ship)}>
                        <th scope='row'>{ship.tier}</th>
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
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </div>
    )
  }
}
