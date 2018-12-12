import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Title from './components/title/title.js';
import Ship from './components/ship/ship.js';

import './App.css';
const history = createBrowserHistory();

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
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
      ]
    }
    this.fetchShips();
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
        console.log("final setState shipsData loaded from fetch ships", this.state.shipList);
        this.fetchArtillary();
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
    // german bb/cl, rn bb, ijn, akizuki, kitikaze, hurogumo 100 HE pen 1/4
    // (ship.nation === "germany" && (ship.type === "Battleship" || ship.type === "Cruiser")) || (ship.nation === "uk" && ship.type === "Battleship") || (ship.nation === "japan" && (ship.name === "akizuki" || ship.name === "kitakaze" || ship.name === "hurogumo"))
    // IFHE x1.3
  }

  render() {
    let that = this;
    return (
      <div className="App">
        <main>
          <BrowserRouter>
            <Switch>
              <Route exact path='/'
              component={Title}
              history={history}/>

              <Route exact path='/title'
              component={Title}
              history={history}/>

              <Route exact path='/ship/:shipName'
              history={history}
              render={(routeProps) => (
                <Ship {...routeProps} shipList={that.state.shipList} />
              )}/>

              <Redirect to="/title" />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default App;
