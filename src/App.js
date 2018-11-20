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
    // this.fetchShips();
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
      });
    })
    .catch((err) => {
      console.log('Fetch Error', err);
    })
  }


  render() {
    let that = this;
    return (
      <div className="App">
        <main>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Title} history={history} shipList={this.state.shipList}/>
              <Route exact path='/title' component={Title} history={history} shipList={this.state.shipList}/>
              <Route
              exact
              path='/ship'

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
