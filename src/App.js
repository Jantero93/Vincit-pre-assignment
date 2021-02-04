import React, { Component } from "react";
import Exercise from "./components/Exercise.js";
import "./Styles.css";


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
      data: null,
    };
  }

  handleLocalFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      complete: this.updateData,
    });
  };

  updateData(results) {  
    this.setState({
      data: results.data,
    });

    console.log("state", this.state.data);
  }

  render() {
    if (this.state.data !== null) {
      return (
        <div>
          <FileReader handleLocalFile={this.handleLocalFile} />
          <p>Please add file</p>
        </div>
      );
    } else {
      return (
        <div>
          <FileReader handleLocalFile={this.handleLocalFile} />
          <Exercise data={this.state.data} />
        </div>
      );
    }
  }
}
