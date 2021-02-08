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
      skipEmptyLines: true,
      complete: this.formatData,
    });
  };

  formatData(results) {  
    //make Date objects and format strings
    for (const csvLine of results.data) {      
      csvLine.Date = new Date(csvLine.Date); 
      csvLine.High = csvLine.High.replace("$", "");
      csvLine.Low = csvLine.Low.replace("$", "");
      csvLine.Open = csvLine.Open.replace("$", "");
      csvLine["Close/Last"] = csvLine["Close/Last"].replace("$", "");
    }
    this.setState({ data: results.data }); 
  }  

  render() {
    if (this.state.data === null) {
      return (
        <div className="frontPage">          
          <p>Please import CSV file, below link to download example file</p> 
          <a href="https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20">https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20</a> 
          <FileReader handleLocalFile={this.handleLocalFile} />
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
