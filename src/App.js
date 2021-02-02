import React, { Component } from "react";
import Test from "./components/Test.js";
import "./Styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
         
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/about">
                <Test text={"about123"} />
              </Route>

              <Route path="/users">
                <Test text={"users123"} />
              </Route>

              <Route path="/">
                <Test text={"homse, grove street"} />
              </Route>              
            </Switch>
          
        </Router>
      </div>
    );
  }
}
