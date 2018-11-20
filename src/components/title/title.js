
import React from 'react';

import ShipSearch from './ship-search.js';
import ShipFilter from './ship-filter.js';
import ShipList from './ship-list.js';
import ShipSpin from '../ship-spin.js';

export default class Title extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedShip: "",
      shipList: [

      ],
      filteredShips: []
    }
    this.fetchShips();
    this.filterShips = this.filterShips.bind(this);
  }
// after redux and later larger databases are implimented, these fetch calls will be removed
  fetchShips() {
    fetch('/api/ships')
    .then((response) => {
      return response.json();
    })
    .then((resJson) => {
      console.log("fetchShips response", resJson);
      this.setState({
        shipList: resJson,
        filteredShips: resJson
      }, () => {
        console.log("final setState shipsData loaded from fetch ships", this.state.shipList);
        // the user will be able to click the app's opening page selections immeditely w/o having to wait for the data.
        if (this.state.filter) {
          this.filterShips(this.state.filter);
        } else {
          this.filterShips({prefill: "prefill"});
        }
      });
    })
    .catch((err) => {
      console.log('Fetch Error', err);
    })
  }

  filterShips(filter) {

    if (filter.prefill === "prefill") {
      // reset the whole list
      this.setState({
        filteredShips: this.state.shipList
      });
    } else if (filter) {
      // reset the list
      this.setState({
        filteredShips: this.state.shipList
      }, () => {
        // then filter the list
        let newShipList = this.state.filteredShips;
        // nested looping to iterate over the ship object and the filter object.
        // researched and found that iterating over the ship list for each value
        // in the filter was going to be optimal performace based on our secifications
        for (const filterKey in filter) {
          let filterValue = filter[filterKey];
          // additionally, seperating out the list into memory, let's us shrink the list with each iteration.
          newShipList = newShipList.filter(ship => ship[filterKey] === filterValue);
        }
        this.setState({
          filteredShips: newShipList,
          filter: filter
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

              World of Warships Battle Field Guide
                <ShipFilter
                shipList={this.state.shipList}
                filterShips={this.filterShips}/>

                <ShipList
                shipList={this.state.shipList}
                filterShips={this.filterShips}
                filteredShips={this.state.filteredShips}
                history={this.props.history}/>

                <ShipSearch />

                <ShipSpin />

        </div>
      </div>
    )
  }
}
