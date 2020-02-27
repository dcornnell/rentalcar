import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Car from "./pages/Car";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container">
              <span className="navbar-brand mb-0 h1 title">JiffyCar</span>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    exact={true}
                    className="navbar-item"
                    activeClassName="is-active"
                    to={"/"}
                  >
                    Home <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/api/cars/:id" component={Car} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}
export default App;
