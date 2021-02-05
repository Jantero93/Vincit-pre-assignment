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
      endDate: null
    };
  }

  startDateChangeHandler(event) {
 //   console.log("startDate",event.target.value);    
    this.setState({startDate: event.target.value});
  }

  endDateChangeHandler(event) {
  //    console.log("endDate", event.target.value);
      this.setState({endDate: event.target.value});
  }

  upwardTrend(){
      console.log("click 2A");
  }

  highestTradingVolume(){
      console.log("click 2B a");
  }

  exerciseTwo_B_b(){
      console.log("click 2B b");
  }
  
  exerciseThree(){
      console.log("click 3");
  }


  render() {
    console.log("exercise state", this.state);
    console.log("exercise props",this.props);

    return (
      <div>
       
           <p>Starting date</p>
           <input
           type='date'
           name='startDate'
           onChange={this.startDateChangeHandler}
           />
           <br />
           <p>Ending date</p>
           <input
           type='date'
           name='endDate'
           onChange={this.endDateChangeHandler}
           />
           <br />
           <br />
           <div className="buttonsDiv">
            <button type="button" onClick={this.upwardTrend}>Longest upward trend</button>
            <br/>
            <button type="button" onClick={this.highestTradingVolume}>The highest trading volume</button>
            <br/>
            <button type="button" onClick={this.exerciseTwo_B_b}>Stock price change within day</button>
            <br/>
            <button type="button" onClick={this.exerciseThree}>SMA 5</button>
           </div>
       
      </div>
    );
  }
}
