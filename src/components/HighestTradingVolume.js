import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

export default class HighestTradingVolume extends Component {
  constructor(props) {
    super(props);

    this.highestTradingVolume = this.highestTradingVolume.bind(this);
  }

  componentDidUpdate(prevProps) { 
  }

  highestTradingVolume() {
    const data = this.props.data.filter(
      (csvLine) =>
        csvLine.Date >= this.props.startDate &&
        csvLine.Date <= this.props.endDate
    );

    // no data in date range
    if (data.length <= 0) {
      return -1;
    }

    //sort by price change within day
    data.sort(function (a, b) {
      return b.Volume - a.Volume;
    });

    //map to data contain only date, volume and price change
    const renderLines = data.map(function (dataLine) {
      return {
        date: dataLine.Date.toLocaleDateString("en-US"),
        volume: dataLine.Volume,
        high: Number(dataLine.High).toFixed(2),
        low: Number(dataLine.Low).toFixed(2),
        priceChange: (Number(dataLine.High) - Number(dataLine.Low)).toFixed(2),
      };
    });

    return renderLines;
  }

  render() {
    if (
      this.props.endDate !== null &&
      this.props.startDate !== null &&
      this.props.data !== null
    ) {
      const data = this.highestTradingVolume();

      if (data === -1) {
        return <div className="upwardTrend">No data in date range</div>;
      }

      //  console.log("data renderissä ", data);
      const renderedData = data.map((csvLine, index) => (
        <tr key={index}>
          <td>{csvLine.date}</td>
          <td>{csvLine.volume}</td>
          <td>{csvLine.high}</td>
          <td>{csvLine.low}</td>
          <td>{csvLine.priceChange}</td>
        </tr>
      ));

      return (
        <div className="result">
          <h1>Sorted by trading volume</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Trade Volume</th>
                <th>High</th>
                <th>Low</th>
                <th>Days change</th>
              </tr>
            </thead>
            <tbody>{renderedData}</tbody>
          </Table>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
