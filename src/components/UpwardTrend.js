import React, { Component } from "react";
import "./otherStyles.css";

const TEXT_ONE = "Close/Last price increased ";
const TEXT_TWO = " day(s) in a row between ";
const TEXT_THREE = " and ";

export default class UpwardTrend extends Component {
  constructor(props) {
    super(props);
    this.upwardTrend = this.upwardTrend.bind(this);   
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.startDate !== this.props.startDate ||
      prevProps.endDate !== this.props.endDate
    );
  }

  upwardTrend() {
    var result = this.props.data.filter(
      (dataLine) =>
        dataLine.Date >= this.props.startDate &&
        dataLine.Date <= this.props.endDate
    );

    //filter days before start day and after end day
    result = result.reverse();

    // if no data what to search for, return
    if (result.length <= 1) {
      return -1;
    }

    // comparing to next element, no need check last one
    var IndexEndOfStreak; // index where is last included day on streak
    var biggestStreak = 0; // variabe
    var currentStreak = 0; // after first compare -> two days row

    for (var i = 0; i < result.length - 1; i++) {
      // if next day bigger -> streak++, else streak = 0

      if (result[i]["Close/Last"] < result[i + 1]["Close/Last"]) {
        currentStreak++;

        if (currentStreak > biggestStreak) {
          biggestStreak = currentStreak;
          //comparing to next one
          IndexEndOfStreak = i + 1;
         
        }
      } else {
        currentStreak = 0;
      }
    }

    //if there wasnt rise between days, return -1
    if (biggestStreak === 0) {
      return -1;
    }

    var dateEnd = new Date(result[IndexEndOfStreak].Date);
    var dateStart = new Date(result[IndexEndOfStreak - biggestStreak].Date);

    dateEnd = dateEnd.toLocaleDateString("en-US");
    dateStart = dateStart.toLocaleDateString("en-US");

    const functionResult = {
      streakLength: (biggestStreak + 1).toString(),
      startingDate: dateStart,
      endingDate: dateEnd,
    };

    return functionResult;
  }

  render() {
    //render only on proper props
    if (
      this.props.endDate !== null &&
      this.props.startDate !== null &&
      this.props.data !== null
    ) {
      const data = this.upwardTrend();

      if (data === -1) {
        return (
          <div className="upwardTrend">
            No data in date range or only one day or no increase between days
          </div>
        );
      }

      return (
        <div className="upwardTrend">
          <p className="streakResult">
            {TEXT_ONE +
              data.streakLength +
              TEXT_TWO +
              data.startingDate +
              TEXT_THREE +
              data.endingDate}{" "}
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
