import React, { Component } from "react";
import Papa from "papaparse";

export default class FileReader extends Component {
  
  render() {
    return (
      <div className="fileSelector">        
        <input
          type="file"
          accept=".csv"
          onChange={(e) => this.props.handleLocalFile(e.target.files[0])}
        />
      </div>
    );
  }
}
