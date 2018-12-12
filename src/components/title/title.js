
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
      this.addStandardBowArmor();
    })
  }

  addStandardBowArmor() {
    var arr = this.state.shipList;
    console.log("addStandardBowArmor", arr);
    arr.forEach(function (ship) {
      if (ship.tier > 7) {
        // t8+
        if (ship.type === "Battleship") {
          //bb 32,
          ship.bowArmor = 32;
          console.log("ship tier 8+", ship.name);
        } else if (ship.type === "Destroyer" || ship.type === "AirCarrier") {
          // dd/cv 19
          ship.bowArmor = 19;
        } else if (ship.type === "Cruiser") {
          //ca 25, DM, Buff, Balt 27, KM ca 27, RN 16
          if (ship.nation === "uk") {
            ship.bowArmor = 16;
          } else if (ship.nation === "germany" || ship.name === "Des Moines" || ship.name === "Buffalo" || ship.name === "Baltimore") {
            ship.bowArmor = 27;
          } else {
            ship.bowArmor = 25;
          }
        }
        //km bb/ca layered, vmf ca layered
      } else if (ship.tier === 6 || ship.tier === 7) {
        // t6/7
        if (ship.type === "Battleship") {
          // bb 25
          ship.bowArmor = 25;
        } else if (ship.type === "Cruiser" || ship.type === "Destroyer") {
          // cl/dd 16, RN/budyonny 13
          if (ship.nation === "uk" || ship.name === "budyonny") {
            ship.bowArmor = 13;
          } else {
            ship.bowArmor = 16;
          }
          // t7 CV 19, CV t6 13
        } else {
          if (ship.tier === 7) {
            ship.bowArmor = 19;
          } else {
            ship.bowArmor = 13;
          }
        }
        // KM bb/cl layered QE layered
      } else if (ship.tier === 5 || ship.tier === 4) {
        // t5/4
        if (ship.type === "Battleship") {
          // bb 19 all layered
          ship.bowArmor = 19;
        } else if (ship.type === "AirCarrier") {
          // CV 5/4 13
          ship.bowArmor = 13;
        } else if (ship.type === "Cruiser" || ship.type === "Destroyer") {
          // t5 cl IJN, VMF, RN, FN 13, FN t4 13
          if (ship.nation === "japan" || ship.nation === "russia" || ship.nation === "uk" || ship.nation === "france") {
            if (ship.tier === 5 || ship.nation === "france") {
              ship.bowArmor = 13;
            }
          } else {
            // cl/dd 10
            ship.bowArmor = 10;
          }
        }
      } else if (ship.tier === 3 || ship.tier === 2 || ship.tier === 1) {
        // t3/2/1
        if (ship.type === "Battleship") {
          // dd/cl 6, bb 16 all layered
          ship.bowArmor = 16;
        } else {
          ship.bowArmor = 6;
        }
      } else {
        console.log("we in trouble, all ships should have a tier", ship.tier);
      }
    });
    this.setState({
      shipList: arr
    }, () => {
      console.log("add bow armor", this.state.shipList);
    });
    // HE pen 1/6, overmatch 1/14?
    // german bb/cl, rn bb, ijn 100 HE pen 1/4
    // IFHE x1.3
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
