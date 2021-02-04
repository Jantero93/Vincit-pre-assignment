import React, { Component } from "react";
import Exercise from "./components/Exercise.js";
import "./Styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Papa from "papaparse";
//import csvFile from "./HistoricalQuotes.csv";
import FileReader from "./components/FileReader";

export default class App extends Component {
  constructor() {
    super(); 
   // this.csvDataFromFile = this.csvDataFromFile.bind(this);
    this.handleLocalFile = this.handleLocalFile.bind(this);
    this.updateData = this.updateData.bind(this);

    this.state = {
      data: null      
    };
  }

  handleLocalFile = (file) => {     
    Papa.parse(file, {
        header: true,
        complete: this.updateData            
    });   
  }

  updateData(results){
    console.log("Finished:", results.data);
            
    this.setState({
      data: results.data
    })

    console.log("state", this.state.data);
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

        <FileReader handleLocalFile={this.handleLocalFile}/>

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
