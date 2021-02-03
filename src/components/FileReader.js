import React, { Component } from 'react'
import Papa from 'papaparse';

export default class FileReader extends Component {
  constructor(){
      super();
     // this.handleFileChosen = this.handleFileChosen.bind(this);
  
     this.handleLocalFile = this.handleLocalFile.bind(this);
  }



  
  handleLocalFile = (file) => {
     
    Papa.parse(file, {
        header: true,
        complete: function(results) {
            console.log("Finished:", results.data[0]);
        }
    });
 
  }

  
  
  render(){
    return(
       <div className="fileSelector">
          <input type="file" accept=".csv" onChange={e => 
              this.handleLocalFile(e.target.files[0])} /> 
       </div>
    )
  }

}
