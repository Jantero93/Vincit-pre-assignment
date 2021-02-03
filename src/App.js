import React, { Component } from "react";
import Exercise from "./components/Exercise.js";
import "./Styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Papa from "papaparse";
import csvFile from "./HistoricalQuotes.csv";
import FileReader from "./components/FileReader";

export default class App extends Component {
  constructor() {
    super(); 
   // this.csvDataFromFile = this.csvDataFromFile.bind(this);

    this.state = {
      data: null,
      download: false,
    };
  }

  componentDidMount() {
    this.csvDataFromFile(); 
  }

  //käännä jsoniks vielä?
  csvDataFromFile(){
    Papa.parse(csvFile, {
      download: true,
      complete: function (input) {
        const records = input.data;
        console.log(records);
      },
    });
  }

  render() {
    return (
      <div>
        <Router>
          <nav>
            <ul className="exerciseList">
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

        <FileReader />

          <Switch>
            <Route path="/about">
              <Exercise text={"about123"} data={this.data} />
            </Route>

            <Route path="/users">
              <Exercise text={"users123"} data={this.data} />
            </Route>

            <Route path="/">
              <Exercise text={"homse, grove street"} data={this.data} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
