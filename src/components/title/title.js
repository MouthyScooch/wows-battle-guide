
import React from 'react';

import ShipSearch from './ship-search.js';
import ShipFilter from './ship-filter.js';
import ShipList from './ship-list.js';

export default class Title extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedShip: "",
      showShipsList: false,
      artilleryList: [],
      shipList: [
        { tier: 10, type: "Destroyer"},
        { tier: 9, type: "Battleship"},
        { tier: 8, type: "AirCarrier"},
        { tier: 7, type: "Cruiser"},
        { tier: 6, type: "Cruiser"},
        { tier: 5, type: "Cruiser"},
        { tier: 4, type: "Cruiser"},
        { tier: 3, type: "Cruiser"},
        { tier: 2, type: "Cruiser"},
        { tier: 1, type: "Cruiser"}
      ],
      filteredShips:
      [
        // { tier: 10, type: "Battleship", nation: "IJN", is_premium: "silver", name: "Yamato" },
        // { tier: 10, type: "Battleship", nation: "USN", is_premium: "silver", name: "Montana" },
        // { tier: 10, type: "Cruiser", nation: "IJN", is_premium: "silver", name: "Zao" },
        // { tier: 10, type: "Cruiser", nation: "USN", is_premium: "silver", name: "Des Moines" },
        // { tier: 10, type: "Destroyer", nation: "IJN", is_premium: "silver", name: "Shimakaze" },
        // { tier: 10, type: "Destroyer", nation: "USN", is_premium: "silver", name: "Gearing" },
        // { tier: 10, type: "AirCarrier", nation: "USN", is_premium: "silver", name: "Midway" },
        // { tier: 9, type: "Cruiser", nation: "USN", is_premium: "silver", name: "Buffalo" },
        // { tier: 8, type: "Cruiser", nation: "USN", is_premium: "silver", name: "Baltimore" },
        // { tier: 7, type: "Cruiser", nation: "USN", is_premium: "silver", name: "New Orleans" },
        // { tier: 6, type: "Cruiser", nation: "USN", is_premium: "silver", name: "Pensacola" },
        // { tier: 5, type: "Cruiser", nation: "USN", is_premium: "silver", name: "Omaha" },
        // { tier: 4, type: "Cruiser", nation: "USN", is_premium: "silver", name: "Phenoix" },
        // { tier: 3, type: "Cruiser", nation: "USN", is_premium: "silver", name: "t3usncl" },
        // { tier: 2, type: "Cruiser", nation: "USN", is_premium: "silver", name: "t2usncl" },
        // { tier: 1, type: "Cruiser", nation: "USN", is_premium: "silver", name: "Erie" },
        // { tier: 9, type: "Destroyer", nation: "USN", is_premium: "gold", name: "Black" },
      ]
    }
    this.fetchShips();
    this.filterShips = this.filterShips.bind(this);
  }
// after redux and later larger databases are implimented, these fetch calls will be removed
// this is redundant and needs to be updated using the App.js props
  fetchShips() {
    fetch('/api/ships')
    .then((response) => {
      return response.json();
    })
    .then((resJson) => {
      this.fetchArtillary();
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

  fetchArtillary() {
    fetch('/api/artilleryModules')
    .then((response) => {
      return response.json();
    })
    .then((resJson) => {
      this.setState({
        artilleryList: resJson
      }, () => {
        this.assignArtillary(); // see notes at function
      });
    })
    .catch((err) => {
      console.log('Fetch Error', err);
    })
  }

  assignArtillary() {
    //this will be updated on the backend and eventually an embedded database. this is all in preparation for expansion
    var arr = this.state.shipList;
    var arra = this.state.artilleryList;

    arr.forEach(function (e) {
      var artillery = arra.find(function (ea) {
        if (e.default_profile.artillery) {
          return ea.module_id === e.default_profile.artillery.artillery_id
        }else{
          return
        }
      });
      e.artillery = artillery;
    });
    this.setState({
      shipList: arr
    }, () => {
      console.log("e.artillery shipList setstate", this.state.shipList);
    })
  }

  filterShips(filter) {

    if (filter.prefill === "prefill") {
      // reset the whole list
      this.setState({
        filteredShips: this.state.shipList,
        showShipsList: false
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
          if (filterValue !== "0") {
            newShipList = newShipList.filter(ship => ship[filterKey] === filterValue);
          }
        }
        this.setState({
          filteredShips: newShipList,
          filter: filter,
          showShipsList: true
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

              <h4><u>World of Warships Battle Field Guide</u></h4>
                <ShipFilter
                shipList={this.state.shipList}
                filterShips={this.filterShips}/>
                {
                  this.state.showShipsList &&
                  <ShipList
                  shipList={this.state.shipList}
                  filterShips={this.filterShips}
                  filteredShips={this.state.filteredShips}
                  history={this.props.history}/>
                }
                <ShipSearch />

        </div>
      </div>
    )
  }
}
