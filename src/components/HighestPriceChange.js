import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

export default class HighestPriceChange extends Component {
  constructor(props) {
    super(props);

    this.highestStockPriceChange = this.highestStockPriceChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    //console.log(prevProps, this.props)
  }

  highestStockPriceChange() {
    //data in date range
    const data = this.props.data.filter(
      (csvLine) =>
        csvLine.Date >= this.props.startDate &&
        csvLine.Date <= this.props.endDate
    );

    // no data, return error
    if (data.length <= 0) {
      return -1;
    }

    //sort by price change within day
    data.sort(function (a, b) {
      let difDayA = a.High - a.Low;
      let difDayB = b.High - b.Low;
      return difDayB - difDayA;
    });

    //map to data contain only date, volume and price change
    const renderLines = data.map(function (dataLine) {
      return {
        date: dataLine.Date.toLocaleDateString("en-US"),
        volume: dataLine.Volume,
        high: Number(dataLine.High).toFixed(2),
        low: Number(dataLine.Low).toFixed(2),
        // price change with two decimals
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
      const data = this.highestStockPriceChange();

      if (data === -1) {
        return <div className="upwardTrend">No data in date range</div>;
      }

      const renderedData = data.map((csvLine, index) => (
        <tr key={index}>
          <td>{csvLine.date}</td> 
          <td> {csvLine.volume} </td>
          <td>{csvLine.high}</td>
          <td>{csvLine.low}</td>
          <td>{csvLine.priceChange}</td>
        </tr>
      ));

      return (
        <div className="result">
          <h1>Sorted by price change</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Trade Volume</th>
                <th>High</th>
                <th>Low</th>
                <th>Days price</th>
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
