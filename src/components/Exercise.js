import React, { Component } from "react";
import ShowResult from "./ShowResult.js";

// showresult class renders exercises based on these consts
const exercise1A = 0;
const EXERCISE2A = 1;
const exercise2B = 2;
const exercose3C = 3; 

export default class Exercise extends Component {
  constructor(props) {
    super(props);

    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    this.upwardTrend = this.upwardTrend.bind(this);
    this.highestTradingVolume = this.highestTradingVolume.bind(this)
    this.SMA5 = this.SMA5.bind(this);

    this.state = {
      exerciseResult: null,
      exerciseNumber: null,
      startDate: null,
      endDate: null     
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
    var result = this.filterExceedingData(
      this.state.startDate,
      this.state.endDate,
      this.props.data
    );

    //filter days before start day and after end day
    result = result.reverse();

    //broilerplate
    if (
      this.state.startDate === null ||
      this.state.endDate === null ||
      this.state.startDate > this.state.endDay
    ) {
      this.setState({ exerciseResult: "invalid date(s)" });
      return;
    }

    var biggestStreak = 0;
    var currentStreak = 0; // after first compare -> two days row

    console.log(result);

    // comparing to next element, no need check last one

    var IndexEndOfStreak;

    for (var i = 0; i < result.length - 1; i++) {
      // if next day bigger -> streak++, else streak = 0

      if (result[i]["Close/Last"] < result[i + 1]["Close/Last"]) {
        currentStreak++;

        if (currentStreak > biggestStreak) {
          biggestStreak = currentStreak;
          //compare to next one
          IndexEndOfStreak = i + 1;
          //console.log("indeksi putken päässä", IndexEndOfStreak);
        }
      } else {
        currentStreak = 0;
      }
    }

    var dateEnd = new Date(result[IndexEndOfStreak].Date);
    var dateStart = new Date(result[IndexEndOfStreak - biggestStreak].Date);

    dateEnd = dateEnd.toLocaleDateString("en-US");
    dateStart = dateStart.toLocaleDateString("en-US");

    const renderedResult =
      "Close/Last price increased " +
      (biggestStreak + 1).toString() +
      " day(s) in a row between " +
      dateStart +
      " and " +
      dateEnd;

    //console.log(biggestStreak, "index: ", IndexEndOfStreak);
    // biggestStreak = biggestStreak.toString() + " day(s) upward trend";
    this.setState({
      exerciseResult: renderedResult,
      exerciseNumber: EXERCISE2A,
    });
  }

  //fixing clocktime on csv dates and browswer dates
  offSetTime(oldDate) {
    var date = new Date(oldDate);
    date.setHours(date.getHours() - 2);
    return date;
  }

  //cut out data outside time range and fixes browser times on same timezone
  filterExceedingData(){
    //set clocktimes  on .csv and local time on same so <= and >= work correctly
    const startDay = this.offSetTime(this.state.startDate);
    const endDay = this.offSetTime(this.state.endDate);

    return this.props.data.filter(
      (csvLine) => csvLine.Date >= startDay && csvLine.Date <= endDay
    );  
  }

  highestTradingVolume() {
    console.log("click 2B a");   
    const data = this.filterExceedingData();

    var hiTradeingVolume = 0; //highest tradeing volume
    var dateTradeVolume = 0; // date on highest tradeing volume
    var hiValueChange = 0; // highest value change within day
    var dateValueChange = 0; // date on highest value change within day

    console.log("data: ",data)
    //change wihin day difference on high and low prices 
    for (const csvLine of data) {

      if (Number(csvLine.Volume) > Number(hiTradeingVolume)) {
        hiTradeingVolume = csvLine.Volume;
        dateTradeVolume = csvLine.Date;
      }

      /*
      console.log("korkein tradevolue:", hiTradeingVolume , 
      "\n korkein volume date: ", dateTradeVolume,
      "\n korkein arvomuutos: ", hiValueChange,
      "\n date korkeimmalle muutokselle: ", dateValueChange);
      */
     

      const difWihinDay = csvLine.High - csvLine.Low;
      console.log("forloop: ", difWihinDay, "  ", csvLine.Date)
      if (Number(hiValueChange) < Number(difWihinDay)) {
        hiValueChange = difWihinDay;
        dateValueChange = csvLine.Date;
      }
    }


    console.log("lopullinen korkeis",hiTradeingVolume);
    console.log("arvo muutos ja pvm: ", hiValueChange, "  ", dateValueChange);
    /*
    pyöristä vielä arvomuutos ja vastausten palauttaminen jotenkin fiksusti?
    */
  } 

  SMA5() {
    console.log("click 3");

    var data = this.filterExceedingData();
    data = data.reverse(); // oldest date first

    for (var i = 0; i < data.length; i++) {

      // if no five 
      if (i - 5 < 0) {

      }

    }
    this.setState({exerciseResult: <div>testi12345678</div>});

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
          <button type="button" onClick={this.SMA5}>
            SMA 5
          </button>
        </div>
        <br></br>
       <div> <ShowResult result={this.state.exerciseResult} exerciseNumber={this.state.exerciseNumber} /> </div>
      </div>
    );
  }
}
