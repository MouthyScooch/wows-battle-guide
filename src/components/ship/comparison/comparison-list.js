import React from 'react';
import { Link, Redirect } from 'react-router-dom';




import {
  UncontrolledTooltip,
  Table,
  Row,
  Col } from 'reactstrap';

export default class ComparisonList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      shipList: this.props.shipList,
      selectedShip: this.props.selectedShip
    }
  }

  render() {
    return (
      <div>
        <Row>
        <Col></Col>
          <Col>
            <Table bordered size="sm" className="table table-hover">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Name</th>
                  <th>caliber</th>
                  <th>bow aromor</th>
                </tr>
              </thead>
              <tbody>
              {
                this.props.shipList.map(
                  function (ship) {
                    return(
                      <tr key={ship.name + "shipTable"} id={"tooltip" + ship.ship_id_str}>
                        <td>{ship.tier}</td>
                        <td>{ship.name}</td>
                        {ship.artillery ? (
                            <td>{ship.artillery.name.slice(0, 3)}</td>
                          ) : (
                            <td>{ship.nation}</td>
                          )}
                        <td>{ship.bowArmor}</td>
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
