
import React from 'react';

import ShipSearch from './ship-search.js';
import ShipFilter from './ship-filter.js';
import ShipList from './ship-list.js';
import ShipSpin from '../ship-spin.js';

import {
  Container,
  Tooltip } from 'reactstrap';

export default class Title extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedShip: "",
      shipList: [
        { tier: 10, class: "BB", nation: "IJN", quality: "silver", name: "Yamato" },
        { tier: 10, class: "BB", nation: "USN", quality: "silver", name: "Montana" },
        { tier: 10, class: "CA", nation: "IJN", quality: "silver", name: "Zao" },
        { tier: 10, class: "CA", nation: "USN", quality: "silver", name: "Des Moines" },
        { tier: 10, class: "DD", nation: "IJN", quality: "silver", name: "Shimakaze" },
        { tier: 10, class: "DD", nation: "USN", quality: "silver", name: "Gearing" },
        { tier: 10, class: "CV", nation: "USN", quality: "silver", name: "Midway" },
        { tier: 9, class: "CA", nation: "USN", quality: "silver", name: "Buffalo" },
        { tier: 8, class: "CA", nation: "USN", quality: "silver", name: "Baltimore" },
        { tier: 7, class: "CA", nation: "USN", quality: "silver", name: "New Orleans" },
        { tier: 6, class: "CA", nation: "USN", quality: "silver", name: "Pensacola" },
        { tier: 5, class: "CA", nation: "USN", quality: "silver", name: "Omaha" },
        { tier: 4, class: "CA", nation: "USN", quality: "silver", name: "Phenoix" },
        { tier: 3, class: "CA", nation: "USN", quality: "silver", name: "t3usncl" },
        { tier: 2, class: "CA", nation: "USN", quality: "silver", name: "t2usncl" },
        { tier: 1, class: "CA", nation: "USN", quality: "silver", name: "Erie" },
        { tier: 9, class: "DD", nation: "USN", quality: "gold", name: "Black" },
      ],
      filteredShips: []
    }
    // this.fetchShips();
    this.filterShips = this.filterShips.bind(this);
  }

  componentWillMount() {
    this.filterShips("prefill");
  }

  // fetchShips() {
  //   fetch('../devSamples/sampleShips.json')
  //   .then(function(response) {
  //     var gg = response.json();
  //     console.log("response.json()", gg);
  //   })
  //   .then(function(myJson) {
  //     console.log(JSON.stringify(myJson));
  //   });
  //
  // }

  filterShips(type, value) {
    if (type === "prefill") {
      this.setState({
        filteredShips: this.state.shipList
      });
    } else if (this.state) {
      let filteredShips = this.state.shipList.filter(ship => ship[type].toString() === value);
      this.setState({
        filteredShips: filteredShips
      });
    } else {
      console.log("filter error");
    }

  }

  render() {
    return (
      <div>
      <div className="content">

              Wows Battle Field Guide
                <ShipFilter shipList={this.state.filteredShips} filterShips={this.filterShips}/>
                <ShipList shipList={this.state.filteredShips} filterShips={this.filterShips}/>
                <ShipSearch />
                <ShipSpin/>

        </div>
      </div>
    )
  }
}
