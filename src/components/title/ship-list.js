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
  }

  render() {
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
                // click handler to be added, linked to main site
                this.props.shipList.map(
                  function (ship) {
                    return(
                      <tr key={ship.name + "shipTable"} id={"tooltip" + ship.ship_id_str}>
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
