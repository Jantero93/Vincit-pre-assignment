import React, { Component } from "react";
import HighestTradingVolume from "./HighestTradingVolume.js";
import UpwardTrend from "./UpwardTrend.js";
import HighestPriceChange from "./HighestPriceChange.js";
import MovingAverage from "./MovingAverage.js";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Exercise extends Component {
  constructor(props) {
    super(props);
 
    this.onValueChange = this.onValueChange.bind(this);
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);

    this.state = {
      selectedOption: null,
      startDate: null,
      endDate: null
    };
  }

  onValueChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  startDateChangeHandler(event) {    
    let date = new Date(event.target.value)    
    //reset time for comparing with csv date objects
    date.setHours(0,0,0,0)
    this.setState({ startDate: date });
  }

  endDateChangeHandler(event) {
    let date = new Date(event.target.value)
    //reset time for comparing with csv date objects
    date.setHours(0,0,0,0)
    this.setState({ endDate: date });
  }

  validDataAndDates(){
    //selected dates, proper data
    if (
      this.state.startDate !== null &&
      this.state.endDate !== null &&
      this.props.data !== undefined
    ) {
      //data range valid
    
      if (this.state.startDate <= this.state.endDate) {
        return true;
      }
    }

    return false;
  }

  renderSwitch() {
    // render component based on radio buttons
    switch (this.state.selectedOption) {
      case "First":
        return (
          <UpwardTrend
            data={this.props.data}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        );

      case "Second_A":
        return (
          <HighestTradingVolume
            data={this.props.data}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        );

      case "Second_B":
        return (
          <HighestPriceChange
            data={this.props.data}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        );
      case "Third":
        return (
          <MovingAverage
            data={this.props.data}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        );

      case "unedited":
        const data = this.props.data.map((csvLine, index) => (
          <tr key={index}>
            <td> {csvLine.Date.toLocaleDateString("en-US")} </td>
            <td> {csvLine["Close/Last"]} </td>
            <td> {csvLine.Volume} </td>
            <td> {csvLine.Open} </td>
            <td> {csvLine.High} </td>
            <td> {csvLine.Low} </td>
          </tr>
        ));

        return (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Close/Last</th>
                  <th>Volume</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </Table>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <div className="dateInput">
          <label>Starting date</label>
          <input
            type="date"
            name="startDate"
            onChange={this.startDateChangeHandler}
          />
          <br></br>
          <label>Ending date</label>
          <input
            type="date"
            name="endDate"
            onChange={this.endDateChangeHandler}
          />
        </div>

        <div className="radioButtons">

          <label>Whole file as it is</label>
          <input
            type="radio"
            value="unedited"
            onChange={this.onValueChange}
            checked={this.state.selectedOption === "unedited"}
          />
          <br></br>

          <label>Upward trend</label>
          <input
            type="radio"
            value="First"
            onChange={this.onValueChange}
            checked={this.state.selectedOption === "First"}
          />
          <br></br>

          <label>Highest trading volume </label>
          <input
            type="radio"
            value="Second_A"
            onChange={this.onValueChange}
            checked={this.state.selectedOption === "Second_A"}
          />
          <br></br>

          <label>Highest price change</label>
          <input
            type="radio"
            value="Second_B"
            onChange={this.onValueChange}
            checked={this.state.selectedOption === "Second_B"}
          />
          <br></br>

          <label>Open price compared 5 sma</label>
          <input
            type="radio"
            value="Third"
            onChange={this.onValueChange}
            checked={this.state.selectedOption === "Third"}
          />
        </div>

        <div className="results">
          {
            // dont render components on invalid data or dates
            
            this.validDataAndDates() ? (
              this.renderSwitch(this.state.selectedOption)
            ) : (
              <div className="invalidDate">Invalid date range or no data</div>
            )
          }
        </div>
      </div>
    );
  }
}
