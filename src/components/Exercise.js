import React, { Component } from "react";
import ShowResult from "./ShowResult.js";

// showresult class renders exercises based on these consts
const EXERCISE2A = 1;
const EXERCISE2B_A = 2;
const EXERCISE2B_B = 3;
const EXERCISE2C = 4;

export default class Exercise extends Component {
  constructor(props) {
    super(props);

    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    this.upwardTrend = this.upwardTrend.bind(this);
    this.highestTradingVolume = this.highestTradingVolume.bind(this);
    this.highestStockPriceChange = this.highestStockPriceChange.bind(this);
    this.simpleAVG = this.simpleAVG.bind(this);

    this.state = {
      exerciseResult: null,
      exerciseNumber: null,
      startDate: null,
      endDate: null,
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
    this.setState({ endDate: new Date(event.target.value) });
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
  filterExceedingData() {
    //set clocktimes  on .csv and local time on same so <= and >= work correctly
    const startDay = this.offSetTime(this.state.startDate);
    const endDay = this.offSetTime(this.state.endDate);
    const data = this.props.data;
    return data.filter(
      (csvLine) => csvLine.Date >= startDay && csvLine.Date <= endDay
    );
  }

  highestTradingVolume() {
    console.log("click 2B a");
    //data in date range
    const data = this.filterExceedingData();

    //sort by price change within day
    data.sort(function (a, b) {
      return b.Volume - a.Volume;
    });

    /*
    for (let i = 0; i < data.length; i++){
      console.log("muutos ", data[i].High - data[i].Low);
    }
    */

    //map to data contain only date, volume and price change
    const renderedData = data.map(function (dataLine) {
      return {
        date: dataLine.Date.toLocaleDateString("en-US"),
        volume: dataLine.Volume,
        // price change with two decimals
        priceChange: (Number(dataLine.High) - Number(dataLine.Low)).toFixed(2),
      };
    });

    //console.log("finaali data \n",renderedData)
    this.setState({
      exerciseResult: renderedData,
      exerciseNumber: EXERCISE2B_A,
    });
    /*
    for (let i = 0; i < renderedData.length; i++){
      console.log(renderedData[i].volume);
    }
*/
  }

  highestStockPriceChange() {
    console.log("click highest stock price change");

    //data in date range
    const data = this.filterExceedingData();

    //sort by price change within day
    data.sort(function (a, b) {
      let difDayA = a.High - a.Low;
      let difDayB = b.High - b.Low;
      return difDayB - difDayA;
    });

    /*
    for (let i = 0; i < data.length; i++){
      console.log("muutos ", data[i].High - data[i].Low);
    }
    */

    //map to data contain only date, volume and price change
    const renderedData = data.map(function (dataLine) {
      return {
        date: dataLine.Date.toLocaleDateString("en-US"),
        volume: dataLine.Volume,
        // price change with two decimals
        priceChange: (Number(dataLine.High) - Number(dataLine.Low)).toFixed(2),
      };
    });

    console.log("finaali data \n",renderedData)
    this.setState({
      exerciseResult: renderedData,
      exerciseNumber: EXERCISE2B_B,
    });
  }


  simpleAVG() {
/*
KESKEN LOOP
*/
    let data = this.props.data;   

    const filteredData = this.filterExceedingData();
    const startDay = filteredData[0].Date;
    const endDay = filteredData[filteredData.length-1].Date;

    console.log("start ",startDay);
    console.log("end day ",endDay);

    //find indexes on original data
    const startIndex = data.findIndex(csvLine => csvLine.Date === startDay);
    const endIndex = data.findIndex(csvLine => csvLine.Date === endDay);
    
    console.log("start index",startIndex)
    console.log("endindex", endIndex);

    // take 5 extra indexes to calc full sma 
    data = data.slice(startIndex,endIndex+6);
    console.log("newdata",data);

    //newest dates first
    //five last indexes only for calc
    for (let i = 0; i < data.length-5; i++) {
      console.log(i, " " , data[i].Date)
      var simpleAVG = 0;
      var totalSum = 0;
      var count = 0;
      //date, price change %, sma

   //   console.log("loop date; ",data[i].Date)
    

      //calc sma
      //higher index older dates
      for (let j = i+1; j < i+6; j++) {
    
         //break if going out array      
         if (data[j] ===undefined) {
          break;
        }

        
        console.log("j loop date ",data[j]["Close/Last"])
        totalSum += Number(data[j]["Close/Last"]);
     
        //count how many numbers counted in total sum to calc avg
        count++;       

      }
      simpleAVG = (Number(totalSum) / Number(count)).toFixed(2);
      console.log("indeksin avg ",simpleAVG);
    }

   

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
            Ordered list by trading volume
          </button>
          <br />
          <button type="button" onClick={this.highestStockPriceChange}>
            Ordered list by price change
          </button>
          <br />
          <button type="button" onClick={this.simpleAVG}>
            SMA 5
          </button>
        </div>
        <br></br>
        <div>
          {" "}
          <ShowResult
            result={this.state.exerciseResult}
            exerciseNumber={this.state.exerciseNumber}
          />{" "}
        </div>
      </div>
    );
  }
}
