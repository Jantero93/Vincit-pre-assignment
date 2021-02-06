import React, { Component } from "react";

export default class Exercise extends Component {
  constructor(props) {
    super(props);

    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    this.upwardTrend = this.upwardTrend.bind(this);
    this.highestTradingVolume = this.highestTradingVolume.bind(this);
    this.exerciseTwo_B_b = this.exerciseTwo_B_b.bind(this);
    this.exerciseThree = this.exerciseThree.bind(this);

    this.state = {
      exercisesResult: null,
      startDate: null,
      endDate: null,
      //invalidDate: false,
    };
  }

  startDateChangeHandler(event) {
    //   console.log("startDate",event.target.value);
    this.setState({ startDate: new Date(event.target.value) });
    //start day can't be before end date or before csv-files dates
    /*
    if (
      this.state.startDate < this.props.data.Date ||
      this.state.startDate > this.state.endDate
    ) {
      this.setState({ invalidDate: true });
    } else {
      this.setState({ invalidDate: false });
    }
    console.log("invalid startDate", this.state.invalidDate);
    */
  }

  endDateChangeHandler(event) {
    //    console.log("endDate", event.target.value);
    this.setState({ endDate: event.target.value });
  }

  upwardTrend() {
    //for shorter variable name
    const data = this.props.data;
    //set clocks on .csv and local time on same so can <= and >= work correctly
    const startDay = this.offSetTime(this.state.startDate);
    const endDay = this.offSetTime(this.state.endDate);
    
    //filter days before start day and after end day
    var result = data.filter(
      (csvLine) => csvLine.Date >= startDay && csvLine.Date <= endDay
    );
    

    //array begins with oldest date
    result = result.reverse();
    

    var biggestStreak = 0;
    var currentStreak = 1;

    console.log(result);

    // comparing to next element
    
    for (var i = 0; i < result.length - 1; i++) {
      // if next day bigger -> streak++
      if (result[i]["Close/Last"] < result[i+1]["Close/Last"]) {
        currentStreak++; if (currentStreak > biggestStreak) biggestStreak = currentStreak;
        console.log("striik kasvo, päiväys, ", result[i].Date, "i: ", i);
      }
      else {
        currentStreak = 1;
      }
    }

    console.log(biggestStreak);
    this.setState({exercisesResult: biggestStreak});
    
  }

  offSetTime(oldDate) {
    var date = new Date(oldDate);
    date.setHours(date.getHours()-2);
    return date;
  }

  highestTradingVolume() {
    console.log("click 2B a");
  }

  exerciseTwo_B_b() {
    console.log("click 2B b");
  }

  exerciseThree() {
    console.log("click 3");
  }

  render() {
    console.log("exercise state", this.state);
    //  console.log("exercise props", this.props);

    return (
      <div>
        <p>Starting date</p>
        <input
          type="date"
          name="startDate"
          onChange={this.startDateChangeHandler}
        />
        <br />
        <p>Ending date</p>
        <input
          type="date"
          name="endDate"
          onChange={this.endDateChangeHandler}
        />
        <br />
        <br />
        <div className="buttonsDiv">
          <button type="button" onClick={this.upwardTrend}>
            Longest upward trend
          </button>
          <br />
          <button type="button" onClick={this.highestTradingVolume}>
            The highest trading volume
          </button>
          <br />
          <button type="button" onClick={this.exerciseTwo_B_b}>
            Stock price change within day
          </button>
          <br />
          <button type="button" onClick={this.exerciseThree}>
            SMA 5
          </button>
        </div>
        <br></br>
        <div>Result: {this.state.exercisesResult}</div>
      </div>
    );
  }
}
