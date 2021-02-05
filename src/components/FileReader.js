import React, { Component } from "react";


export default class FileReader extends Component {
  
  render() {
    return (
      <div className="fileSelector">        
        <input
          type="file"
          accept=".csv"
          onChange={(e) => this.props.handleLocalFile(e)}
        />
      </div>
    );
  }
}
