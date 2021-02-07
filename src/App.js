import React, { Component } from "react";
import Exercise from "./components/Exercise.js";
import "./Styles.css";

import Papa from "papaparse";
import FileReader from "./components/FileReader";

export default class App extends Component {
  constructor() {
    super();
    // this.csvDataFromFile = this.csvDataFromFile.bind(this);
    this.handleLocalFile = this.handleLocalFile.bind(this);
    this.formatData = this.formatData.bind(this);

    this.state = {
      data: null,
    };
  }

  handleLocalFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      delimiter: ", ",
      complete: this.formatData,
    });
  };

  formatData(results) {
    //  console.log("original",results.data);

    for (const csvLine of results.data) {
      // convert date to Date object   
      csvLine.Date = new Date(csvLine.Date);
      //parse $ from strings
      csvLine.High = csvLine.High.replace("$", "");
      csvLine.Low = csvLine.Low.replace("$", "");
      csvLine.Open = csvLine.Open.replace("$", "");
      csvLine["Close/Last"] = csvLine["Close/Last"].replace("$", "");
    }

    //console.log("results data forin jälkeen", results.data);

    this.setState({ data: results.data });
    console.log("this.state app js updated data", this.state);
  }  

  render() {
    if (this.state.data === null) {
      return (
        <div>
          <FileReader handleLocalFile={this.handleLocalFile} />
          <p>Please import CSV file, below link to download example file</p> 
          <a href="https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20">https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20</a> 

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
