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

  findHEPenColor (cal, bowArmor) {
    if (cal/6 > bowArmor) {
      return "red"
    }
    return ""
  }

  render() {
    var that = this;
    return (
      <div>
        <Row>
        <Col></Col>
          <Col>
            <Table bordered size="sm" className="table table-hover" responsive style={{textAlign: "left"}}>
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Name</th>
                  <th>caliber</th>
                  <th>bow aromor</th>
                </tr>
              </thead>
              {
                this.props.shipList.map(
                  function (ship) {
                    var cal = ship.artillery ? ship.artillery.name.slice(0, 3) : "";
                    var selectedShipCal = that.state.selectedShip.artillery ? that.state.selectedShip.artillery.name.slice(0, 3) : "";
                    return(
                      <tbody>

                        <tr key={ship.name + "shipTable"} id={"tooltip" + ship.ship_id_str}>
                          <td>{ship.tier}</td>
                          <td>
                            <span style={{color: that.findHEPenColor(cal, that.state.selectedShip.bowArmor)}}>{cal}</span> {ship.name} <span style={{color: that.findHEPenColor(selectedShipCal, ship.bowArmor)}}>{ship.bowArmor}</span></td>
                          <td>{cal}</td>
                          <td>{ship.bowArmor}</td>
                            <UncontrolledTooltip placement="right" target={"tooltip" + ship.ship_id_str}>
                              {ship.description}
                            </UncontrolledTooltip>
                        </tr>

                      </tbody>
                    )
                  }
                )
              }
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </div>
    )
  }
}
