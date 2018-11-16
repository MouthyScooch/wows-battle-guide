
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
        { tier: 10, type: "BB", nation: "IJN", is_premium: "silver", name: "Yamato" },
        { tier: 10, type: "BB", nation: "USN", is_premium: "silver", name: "Montana" },
        { tier: 10, type: "CA", nation: "IJN", is_premium: "silver", name: "Zao" },
        { tier: 10, type: "CA", nation: "USN", is_premium: "silver", name: "Des Moines" },
        { tier: 10, type: "DD", nation: "IJN", is_premium: "silver", name: "Shimakaze" },
        { tier: 10, type: "DD", nation: "USN", is_premium: "silver", name: "Gearing" },
        { tier: 10, type: "CV", nation: "USN", is_premium: "silver", name: "Midway" },
        { tier: 9, type: "CA", nation: "USN", is_premium: "silver", name: "Buffalo" },
        { tier: 8, type: "CA", nation: "USN", is_premium: "silver", name: "Baltimore" },
        { tier: 7, type: "CA", nation: "USN", is_premium: "silver", name: "New Orleans" },
        { tier: 6, type: "CA", nation: "USN", is_premium: "silver", name: "Pensacola" },
        { tier: 5, type: "CA", nation: "USN", is_premium: "silver", name: "Omaha" },
        { tier: 4, type: "CA", nation: "USN", is_premium: "silver", name: "Phenoix" },
        { tier: 3, type: "CA", nation: "USN", is_premium: "silver", name: "t3usncl" },
        { tier: 2, type: "CA", nation: "USN", is_premium: "silver", name: "t2usncl" },
        { tier: 1, type: "CA", nation: "USN", is_premium: "silver", name: "Erie" },
        { tier: 9, type: "DD", nation: "USN", is_premium: "gold", name: "Black" },
      ],
      filteredShips: []
    }
    this.fetchShips();
    this.filterShips = this.filterShips.bind(this);
  }

  componentWillMount() {
    this.filterShips({prefill: "prefill"});
  }

  fetchShips() {
    fetch('/api/ships')
    .then((response) => {
      return response.json();
    })
    .then((resJson) => {
      console.log("fetchShips response", resJson);
      this.setState({
        shipList: resJson
      }, () => {
        this.filterShips({prefill: "prefill"});
      });
    })
    .then((resJson) => {
      console.log("after final setState shipsData", this.state.shipList);
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    })
  }

  // filterShips(type, value) {
  //   console.log(type, value);
  //   if (type === "prefill") {
  //     this.setState({
  //       filteredShips: this.state.shipList
  //     });
  //   } else if (this.state) {
  //     let filteredShips = this.state.filteredShips.filter(ship => ship[type].toString() === value);
  //     this.setState({
  //       filteredShips: filteredShips
  //     });
  //   } else {
  //     console.log("filter error");
  //   }
  // }

  filterShips(filter) {

    if (filter.prefill === "prefill") {
      this.setState({
        filteredShips: this.state.shipList
      });
    } else if (filter) {
      this.setState({
        filteredShips: this.state.shipList
      }, () => {
        let newShipList = this.state.filteredShips;
        for (const filterKey in filter) {
          let filterValue = filter[filterKey];
          newShipList = newShipList.filter(ship => ship[filterKey] === filterValue);
        }
        this.setState({
          filteredShips: newShipList
        });
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
                <ShipFilter shipList={this.state.shipList} filterShips={this.filterShips}/>
                <ShipList shipList={this.state.filteredShips} filterShips={this.filterShips} />
                <ShipSearch />
                <ShipSpin />

        </div>
      </div>
    )
  }
}
