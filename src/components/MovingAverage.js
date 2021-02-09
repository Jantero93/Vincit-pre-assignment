import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MovingAverage extends Component {
  constructor(props) {
    super(props);

    this.movingAverage = this.movingAverage.bind(this);
  }

  componentDidUpdate(prevProps) {}

  calcSMAforIndex(allData, i) {
    //push close/last prices array, calc sma
    var numbers = [];

    //push five next indexes
    var current = i + 1;
    var overLastIndex = i + 6;

    // get next five elements (or less if there are not enough elements)
    // break after five or end of array
    while (true) {
      if (current >= allData.length || current === overLastIndex) {
        break;
      } else {
        numbers.push(Number(allData[current]["Close/Last"]));
        current++;
      }
    }

    // sum array and calc average
    const sum = numbers.reduce((a, b) => a + b, 0);
    return (sum / numbers.length).toFixed(2) || 0;
  }

  movingAverage() {
    /*
     moving average will be calculed even there are not 5 previous days
     second last day's average will be n-1 and third last (n-1 + n-2)/2 etc
     */
    //slice data outside date range
    const dataActualIdx = this.props.data.filter(
      (csvLine) =>
        csvLine.Date >= this.props.startDate &&
        csvLine.Date <= this.props.endDate
    );

    // no data, return -1 for error
    if (dataActualIdx.length <= 0) {
      return -1;
    }

    //need five extra indexes to calc sma on all data ranges indexes
    // find indexes on original data
    const startIndex = this.props.data.findIndex(
      (csvLine) => csvLine.Date.getTime() === dataActualIdx[0].Date.getTime()
    );
    //endIndex included in date range
    const endIndex = this.props.data.findIndex(
      (csvLine) =>
        csvLine.Date.getTime() ===
        dataActualIdx[dataActualIdx.length - 1].Date.getTime()
    );

    /*
     two arrays, another contains actual indexes which on we calc sma, 
     another contain all data for calcuing it (+5 days from past)
    */

    //slice doesn't include ending index on new array, 5 + 1
    const allData = this.props.data.slice(startIndex, endIndex + 6);

    //store avgs on same index order
    var indexAVG = [];
    for (let i = 0; i < dataActualIdx.length; i++) {
      //calc sma on data ranges indexes individually
      //push on own array, order same as in dataActualIdx
      indexAVG.push(this.calcSMAforIndex(allData, i));
    }

    //calc procent change, if sma smaller procent is negative
    // ((sma - open)/open) x 100
    // make objects with same loop

    var objectList = [];

    for (let i = 0; i < dataActualIdx.length; i++) {
      //nicer variable
      let openPrice = Number(dataActualIdx[i].Open);

      let procentChange = (
        ((openPrice - indexAVG[i]) / indexAVG[i]) *
        100
      ).toFixed(2);

      objectList.push({
        date: dataActualIdx[i].Date.toLocaleDateString("en-US"),
        change: procentChange,
        openPrice: openPrice.toFixed(2),
        SMA: indexAVG[i],
      });
    }

    //sort by procentchange
    objectList.sort(function (a, b) {
      // highest -> lowest
      return b.change - a.change;
    });

    return objectList;
  }

  render() {
    const data = this.movingAverage();

    //no real data to map
    if (data === -1) {
      return <div className="upwardTrend">No data in date range</div>;
    }

    const renderedData = data.map((csvLine, index) => (
      <tr key={index}>
        <td>{csvLine.date}</td>
        <td>{csvLine.openPrice}</td>
        <td>{csvLine.SMA}</td>
        <td>{csvLine.change + " %"}</td>
      </tr>
    ));

    return (
      <div className="result">
        <h1>Open price change from 5 previous days sma</h1>
        <h1>Sorted by price % change</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Open price</th>
              <th>SMA 5 days</th>
              <th>Open change from sma</th>
            </tr>
          </thead>
          <tbody>{renderedData}</tbody>
        </Table>
      </div>
    );
  }
}
