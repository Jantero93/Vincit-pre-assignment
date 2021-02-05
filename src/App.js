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
  //  console.log("original",results.data);
    // convert date MM/DD/YYYY to YYYY/MM/DD
    const updated_data = results.data.map(oneCsvLine => this.convertDate(oneCsvLine));    
  //  console.log("updated data from map",updated_data);
    this.setState({data: updated_data});
    console.log("this.state app js updated data", this.state);
  }

  convertDate(CsvLine){
   // console.log("csv line before mapping",oldDate);
    let dateParts = CsvLine.Date.split("/");
   // console.log("date_parts",dateParts);
    CsvLine.Date = dateParts[2] + "/" + dateParts[0] + "/" + dateParts[1]; 
    return CsvLine;
  }
  

  

  render() {
    if (this.state.data === null) {
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
